import {Db, InsertOneResult, ObjectId} from 'mongodb'
import {Request, Response} from 'express'

export class BaseService<T> {

  constructor(protected database: Db, protected collectionName: string) {
  }

  async createOne(req: any, res: any): Promise<InsertOneResult<Document> | any> {
    try {
      const item = await this.database.collection(this.collectionName).insertOne(req.body)
      //TODO: create logger for all methods and requests
      return res.json(item)
    } catch (error) {
      return res.json({status: 400, message: error.message})
    }
  }

  async find(req: Request, res: Response): Promise<any> {
    try {
      const items = await this.database.collection(this.collectionName).find().toArray()
      return res.json(items)
    } catch (error) {
      return res.json({status: 400, message: error.message})
    }
  }

  async findOne(req: any, res: any): Promise<T | any> {
    let id: ObjectId
    try {
      id = new ObjectId(req.params._id)

      if (!id) {
        return res.json({status: 400, message: `Invalid id ${req.params._id}`})
      }
    } catch (error) {
      res.status(400)
      return res.json({status: 400, message: `Invalid id ${req.params._id}`})
    }

    try {
      const item = await this.database.collection(this.collectionName).findOne({_id: id})

      if (!item) {
        return res.json({status: 404, message: `Item not found ${req.params._id}`})
      }

      return res.json(item)
    } catch (error) {
      return res.json({status: 400, message: error.message})
    }
  }

  async updateOne(req: any, res: any): Promise<T | any> {
    try {
      const id = new ObjectId(req.params._id)
      const item = await this.database.collection(this.collectionName).findOneAndUpdate({_id: id}, {$set: req.body})
      return res.json(item)
    } catch (error) {
      console.log(error)
      return res.json({status: 400, message: error.message})
    }
  }

  async deleteOne(req: any, res: any): Promise<{deleted: boolean} | any> {
    try {
      const id = new ObjectId(req.params._id)
      await this.database.collection(this.collectionName).findOneAndDelete({_id: id})
      return res.json({deleted: true})
    } catch (error) {
      return res.json({status: 400, message: error.message})
    }
  }
}
