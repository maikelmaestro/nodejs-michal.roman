import {Db, InsertOneResult, ObjectId} from 'mongodb'
import {Request, Response} from 'express'
import {logger} from '../../logger/tslogger'

export class BaseService<T> {

  constructor(protected database: Db, protected collectionName: string) {
  }

  async createOne(req: Request, res: Response): Promise<InsertOneResult<Document> | any> {
    try {
      const item = await this.database.collection(this.collectionName).insertOne(req.body)
      logger.infoLog(req)
      return res.json(item)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.json({status: 400, message: error.message})
    }
  }

  async find(req: Request, res: Response): Promise<any> {
    try {
      const items = await this.database.collection(this.collectionName).find().toArray()
      logger.infoLog(req)
      return res.json(items)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.json({status: 400, message: error.message})
    }
  }

  async findOne(req: Request, res: Response): Promise<T | any> {
    let id: ObjectId
    try {
      id = new ObjectId(req.params._id)

      if (!id) {
        logger.errorLog(req, `Invalid id ${req.params._id}`)
        return res.json({status: 400, message: `Invalid id ${req.params._id}`})
      }
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.json({status: 400, message: `Invalid id ${req.params._id}`})
    }

    try {
      const item = await this.database.collection(this.collectionName).findOne({_id: id})

      if (!item) {
        logger.errorLog(req, `Item with id: ${req.params._id} not found`)
        return res.json({status: 404, message:`Item with id: ${req.params._id} not found`})
      }
      logger.infoLog(req)
      return res.json(item)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.json({status: 400, message: error.message})
    }
  }

  async updateOne(req: Request, res: Response): Promise<T | any> {
    try {
      const id = new ObjectId(req.params._id)
      const item = await this.database.collection(this.collectionName).findOneAndUpdate({_id: id}, {$set: req.body})
      logger.infoLog(req)
      return res.json(item)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.json({status: 400, message: error.message})
    }
  }

  async deleteOne(req: Request, res: Response): Promise<{deleted: boolean} | any> {
    try {
      const id = new ObjectId(req.params._id)
      await this.database.collection(this.collectionName).findOneAndDelete({_id: id})
      logger.infoLog(req)
      return res.json({deleted: true})
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.json({status: 400, message: error.message})
    }
  }
}
