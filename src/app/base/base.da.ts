import {Db, ObjectId} from 'mongodb'
import {DBConnections} from '../../services/databases/DBConnections'
import {IBaseItem} from './base.model'
import {HttpException} from '../../exceptions/HttpException'

export class BaseDa<T extends IBaseItem, DTO> {
  protected database: Db

  constructor(protected collectionName: string) {
    this.getDB()
  }

  async find(query: {filter: any, sort: any}): Promise<T[]> {
    try {
      return await this.database.collection(this.collectionName).find(query.filter).sort(query.sort).toArray() as T[]
    } catch (error) {
      throw new HttpException(error.status, 'Unable to find items')
    }
  }

  async findOne(id: ObjectId): Promise<T> {
    let found: T
    try {
      found = await this.database.collection(this.collectionName).findOne({_id: id}) as T
    } catch (error) {
      throw new HttpException(error.status, `Unable to find item with id ${id}`)
    }

    if (!found) {
      console.log('id not found')
      throw new HttpException(404, `Unable to find item with id ${id}`)
    }

    return found
  }

  async createOne(payload: DTO): Promise<{id: ObjectId}> {
    try {
      const created = await this.database.collection(this.collectionName).insertOne(payload)
      return {id: created.insertedId}
    } catch (error) {
      throw new HttpException(error.status, 'Unable to create item')
    }
  }

  async updateOne(id: ObjectId, payload: DTO): Promise<{updated: boolean}> {
    try {
      const item = await this.database.collection(this.collectionName).updateOne({_id: id}, {$set: payload})

      if (item.modifiedCount === 0) {
        return {updated: false}
      }
      return {updated: true}
    } catch (error) {
      throw new HttpException(error.status, `Unable to update item with id ${id}`)
    }

  }

  async deleteOne(id: ObjectId): Promise<{deleted: boolean}> {
    try {
      const deleted = await this.database.collection(this.collectionName).deleteOne({_id: id})

      if (deleted.deletedCount === 0) {
        return {deleted: false}
      }

      return {deleted: true}
    } catch (error) {
      throw new HttpException(error.status, `Unable to delete item with id ${id}`)
    }
  }

  protected async getDB(): Promise<void> {
    this.database = await DBConnections.getDatabase()
  }
}
