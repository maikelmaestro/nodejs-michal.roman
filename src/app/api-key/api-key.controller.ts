import * as express from 'express'

import {Request, Response} from 'express'
import {ApiKeyService} from './api-key.service'
import {apiKeyCreateSchema, apiKeyUpdateSchema, IApiKey} from './api-key.model'
import {IBaseController} from '../../controllers/base.controller'
import {API_VERSION_PATH} from '../../shared/api.consts'
import {COLLECTION_API_KEY} from '../../shared/database.consts'
import {validateParams, validateRequest} from '../../middlewares/validator.middleware'
import {paramsSchema} from '../../shared/query.validator'
import {logger} from '../../logger/tslogger'
import {firebaseAuthMiddleware} from '../../middlewares/firebase-auth.middleware'

export class ApiKeyController implements IBaseController {
  public router = express.Router()
  path: string = API_VERSION_PATH
  collectionName: string = COLLECTION_API_KEY
  private service: ApiKeyService = new ApiKeyService()

  constructor() {
    this.initRouter()
  }

  private call = fn => (req, res, next) => this[fn](req, res, next)

  async initRouter() {

    this.router.get(`/${this.collectionName}`, [
      // firebaseAuthMiddleware
    ], this.call('find'))

    this.router.get(`/${this.collectionName}/:_id`, [
      // firebaseAuthMiddleware,
      validateParams(paramsSchema)
    ], this.call('findOne'))

    this.router.post(`/${this.collectionName}/`, [
      // firebaseAuthMiddleware,
      validateRequest(apiKeyCreateSchema)
    ], this.call('createOne'))

    this.router.delete(`/${this.collectionName}/:_id`, [
      // firebaseAuthMiddleware,
      validateParams(paramsSchema)
    ], this.call('deleteOne'))

    this.router.put(`/${this.collectionName}/:_id`, [
      // firebaseAuthMiddleware,
      validateParams(paramsSchema),
      validateRequest(apiKeyUpdateSchema)
    ], this.call('updateOne'))
  }

  async createOne(req: Request, res: Response): Promise<Response<IApiKey>> {
    try {
      const created = await this.service.createOne(req.body)
      return res.json(created)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.json({status: 400, message: error.message})
    }
  }

  async find(req: Request, res: Response): Promise<Response<IApiKey[]>> {
    try {
      // TODO: add filter, pagination, limit, sort
      const items = await this.service.find(req.query.filter)
      return res.json(items)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.json({status: 400, message: error.message})
    }
  }

  async findOne(req: Request, res: Response): Promise<Response<IApiKey>> {
    try {
      const item = await this.service.findOne(req.params._id)
      return res.json(item)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.json({status: 400, message: error.message})
    }
  }

  async updateOne(req: Request, res: Response): Promise<Response<IApiKey>> {
    try {
      const item = await this.service.updateOne(req.params._id, req.body)
      return res.json(item)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.json({status: 400, message: error.message})
    }
  }

  async deleteOne(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await this.service.deleteOne(req.params._id)
      return res.json(deleted)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.json({status: 400, message: error.message})
    }
  }
}
