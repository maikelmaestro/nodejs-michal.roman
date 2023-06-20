import {createClient} from 'redis'
import {dim, green, red, yellow} from 'colors'
require('dotenv').config()

export interface SetOptions {
  // in seconds
  EX: number
}

class RedisCache {
  expireInSeconds: number = 60 * 60
  client: ReturnType<typeof createClient>
  url: string = `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}`

  constructor() {
    this.init()
  }

  async init() {
    try {
      this.log(yellow(`Connecting to: ${this.url}`))
      this.client = createClient()
      this.client.on('connect', async () => {
        const now = new Date().toISOString()
        await this.client.set('connected', now)
        this.log(green(`Connected`))
        this.reset()
      })

      this.client.on('error', (e) => this.log(red(e)))
      await this.client.connect()

    } catch (e) {
      this.log(red('Cannot init cache'))
      this.log(red(e))
    }

    return this.client
  }

  async get(key: string): Promise<string> {
    return await this.client.get(key)
  }

  async getJSON(key: string): Promise<any> {
    const entity: string = await this.client.get(key)
    return JSON.parse(entity)
  }

  async set(key: string, value: any, options?: SetOptions): Promise<string> {
    return await this.client.set(key, value, {EX: options?.EX || this.expireInSeconds})
  }

  async setJSON(key: string, value: any, options?: SetOptions): Promise<string> {
    return await this.client.set(key, JSON.stringify(value), {EX: options?.EX || this.expireInSeconds})
  }

  async has(key: string): Promise<number> {
    return await this.client.exists(key)
  }

  async del(key: string): Promise<number> {
    return await this.client.del(key)
  }

  async reset(): Promise<string> {
    this.log(dim(`Flushed all`))
    return await this.client.flushAll()
  }

  log(message: string): void {
    console.log(`${red('Redis:')} ${message}`)
  }
}

export const redisCache: RedisCache = new RedisCache()
