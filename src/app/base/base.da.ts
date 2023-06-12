import {Db, ObjectId} from 'mongodb'
import {DBConnections} from '../../services/databases/DBConnections'
import {IBaseItem} from './base.model'

export class BaseDa<T extends IBaseItem, DTO> {
  private database: Db

  constructor(protected collectionName: string) {
    this.getDB()
  }

  async find(options: any): Promise<T[]> {
    try {
      return await this.database.collection(this.collectionName).find().toArray() as T[]
    } catch (error) {
      throw error
    }
  }

  async findOne(id: ObjectId): Promise<T> {
    try {
      return await this.database.collection(this.collectionName).findOne({_id: id}) as T
    } catch (error) {
      throw error
    }
  }

  async createOne(payload: DTO): Promise<{id: ObjectId}> {
    try {
      const created = await this.database.collection(this.collectionName).insertOne(payload)
      return {id: created.insertedId}
    } catch (error) {
      throw error
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
      throw error
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
      throw error
    }
  }

  protected async getDB(): Promise<void> {
    this.database = await DBConnections.getDatabase()
  }
}
