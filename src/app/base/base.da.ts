import {Db, ObjectId} from 'mongodb'
import {DBConnections} from '../../services/databases/DBConnections'
import {IBaseItem} from './base.model'
import {HttpException} from '../../exceptions/HttpException'
import {redisCache} from '../cache/redis'

export class BaseDa<T extends IBaseItem, DTO> {
  protected database: Db
  private cacheKey: string = this.collectionName

  constructor(protected collectionName: string) {
    this.getDB()
  }

  async find(query: {filter: any, sort: any}): Promise<T[]> {
    // TODO: Fetch from cache fix if filter used
    // const cacheData = await redisCache.getJSON(this.cacheKey)

    // if (cacheData) return cacheData

    try {
      const data = await this.database.collection(this.collectionName).find(query.filter).sort(query.sort).toArray() as T[]
      // await redisCache.setJSON(this.cacheKey, data)
      return data
    } catch (error) {
      throw new HttpException(error.status, `Unable to find ${this.collectionName} items`)
    }
  }

  async findOne(id: ObjectId): Promise<T> {
    let found: T = await redisCache.getJSON(`${this.cacheKey}:${id}`)

    if (found) return found

    try {
      found = await this.database.collection(this.collectionName).findOne({_id: id}) as T
    } catch (error) {
      throw new HttpException(error.status, `Unable to find ${this.collectionName} with id ${id}`)
    }

    if (!found) {
      throw new HttpException(404, `Unable to find ${this.collectionName} with id ${id}`)
    }

    await redisCache.setJSON(`${this.cacheKey}:${id}`, found)
    return found
  }

  async createOne(payload: DTO): Promise<{id: ObjectId}> {
    try {
      const created = await this.database.collection(this.collectionName).insertOne(payload)
      // await redisCache.del(`${this.cacheKey}`)
      return {id: created.insertedId}
    } catch (error) {
      throw new HttpException(error.status, `Unable to create ${this.collectionName}`)
    }
  }

  async updateOne(id: ObjectId, payload: DTO): Promise<T> {
    try {
      const item = await this.database.collection(this.collectionName).findOneAndUpdate(
        {_id: id}, {$set: payload}, {returnDocument: 'after'})

      await redisCache.setJSON(`${this.cacheKey}:${id}`, item.value)
      // await redisCache.del(`${this.cacheKey}`)
      return item.value as T
    } catch (error) {
      throw new HttpException(error.status, `Unable to update ${this.collectionName} with id ${id}`)
    }
  }

  async deleteOne(id: ObjectId): Promise<{deleted: boolean}> {
    try {
      const deleted = await this.database.collection(this.collectionName).deleteOne({_id: id})

      if (deleted.deletedCount === 0) {
        return {deleted: false}
      }
      await redisCache.del(`${this.cacheKey}:${id}`)

      // const fromCache = await redisCache.getJSON(this.cacheKey)
      //
      // if (fromCache) {
      //   const filtered = fromCache.filter(item => item._id !== id.toString())
      //   await redisCache.setJSON(this.cacheKey, filtered)
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
