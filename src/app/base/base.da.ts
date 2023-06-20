import {Db, ObjectId} from 'mongodb'
import {DBConnections} from '../../services/databases/DBConnections'
import {IBaseItem} from './base.model'
import {HttpException} from '../../exceptions/HttpException'
import {redisCache} from '../cache/redis'
import {generateRedisKey} from '../utils/generateRedisKey'

export class BaseDa<T extends IBaseItem, DTO> {
  protected database: Db
  private cachePrefix: string = this.collectionName

  constructor(protected collectionName: string) {
    this.getDB()
  }

  async find(query: {filter: any, sort: any}): Promise<T[]> {
    const cacheKey: string = generateRedisKey(this.cachePrefix, query.filter)
    const cacheData = await redisCache.getJSON(cacheKey)

    if (cacheData) return cacheData

    try {
      const data = await this.database.collection(this.collectionName).find(query.filter).sort(query.sort).toArray() as T[]
      await redisCache.setJSON(cacheKey, data)
      return data
    } catch (error) {
      throw new HttpException(error.status, `Unable to find ${this.collectionName} items`)
    }
  }

  async findOne(id: ObjectId): Promise<T> {
    const cacheKey = generateRedisKey(this.cachePrefix)

    let found: T = await redisCache.getJSON(`${cacheKey}:${id}`)

    if (found) return found

    try {
      found = await this.database.collection(this.collectionName).findOne({_id: id}) as T
    } catch (error) {
      throw new HttpException(error.status, `Unable to find ${this.collectionName} with id ${id}`)
    }

    if (!found) {
      throw new HttpException(404, `Unable to find ${this.collectionName} with id ${id}`)
    }

    await redisCache.setJSON(`${cacheKey}:${id}`, found)
    return found
  }

  async createOne(payload: DTO): Promise<{id: ObjectId}> {

    try {
      const created = await this.database.collection(this.collectionName).insertOne(payload)
      await redisCache.reset()
      return {id: created.insertedId}
    } catch (error) {
      throw new HttpException(error.status, `Unable to create ${this.collectionName}`)
    }
  }

  async updateOne(id: ObjectId, payload: DTO): Promise<T> {
    const cacheKey: string = generateRedisKey(this.cachePrefix)

    try {
      const item = await this.database.collection(this.collectionName).findOneAndUpdate(
        {_id: id}, {$set: payload}, {returnDocument: 'after'})

      await redisCache.reset()
      await redisCache.setJSON(`${cacheKey}:${id}`, item.value)

      return item.value as T
    } catch (error) {
      throw new HttpException(error.status, `Unable to update ${this.collectionName} with id ${id}`)
    }
  }

  async deleteOne(id: ObjectId): Promise<{deleted: boolean}> {
    const cacheKey: string = generateRedisKey(this.cachePrefix)

    try {
      const deleted = await this.database.collection(this.collectionName).deleteOne({_id: id})

      if (deleted.deletedCount === 0) {
        return {deleted: false}
      }

      await redisCache.reset()

      // await redisCache.del(`${cacheKey}:${id}`)

      // const fromCache = await redisCache.getJSON(cacheKey)
      //
      // if (fromCache) {
      //   const filtered = fromCache.filter(item => item._id !== id.toString())
      //   await redisCache.setJSON(cacheKey, filtered)
      // }

      return {deleted: true}
    } catch (error) {
      throw new HttpException(error.status, `Unable to delete ${this.collectionName} with id ${id}`)
    }
  }

  protected async getDB(): Promise<void> {
    this.database = await DBConnections.getDatabase()
  }
}
