import * as express from 'express'

import {Response} from 'express'
import {validateParams, validateRequest} from '../../middlewares/validator.middleware'
import {logger} from '../../logger/tslogger'
import {firebaseAuthMiddleware} from '../../middlewares/firebase-auth.middleware'
import {IBaseController} from '../base/base.controller'
import {API_VERSION_PATH} from '../shared/api.consts'
import {COLLECTION_SESSION_KEY} from '../shared/database.consts'
import {paramsSchema} from '../shared/query.validator'
import {IRequest, IResponse} from '../shared/requests/requests.types'
import {SessionKeyService} from './session-key.service'
import {ISessionKey, sessionKeyCreateSchema, sessionKeyUpdateSchema} from './session-key.model'

export class SessionKeyController implements IBaseController {
  public router = express.Router()
  path: string = API_VERSION_PATH
  collectionName: string = COLLECTION_SESSION_KEY

  constructor(private service: SessionKeyService) {
    this.initRouter()
  }

  private call = fn => (req, res, next) => this[fn](req, res, next)

  async initRouter() {

    this.router.get(`/${this.collectionName}`, [
      firebaseAuthMiddleware
    ], this.call('find'))

    this.router.get(`/${this.collectionName}/:_id`, [
      firebaseAuthMiddleware,
      validateParams(paramsSchema)
    ], this.call('findOne'))

    this.router.post(`/${this.collectionName}/`, [
      firebaseAuthMiddleware,
      validateRequest(sessionKeyCreateSchema)
    ], this.call('createOne'))

    this.router.delete(`/${this.collectionName}/:_id`, [
      firebaseAuthMiddleware,
      validateParams(paramsSchema)
    ], this.call('deleteOne'))

    this.router.put(`/${this.collectionName}/:_id`, [
      firebaseAuthMiddleware,
      validateParams(paramsSchema),
      validateRequest(sessionKeyUpdateSchema)
    ], this.call('updateOne'))
  }

  async createOne(req: IRequest, res: IResponse): Promise<Response<ISessionKey>> {
    const body = {...req.body}
    body.user = req.user as string || undefined

    try {
      const created = await this.service.createOne(body)
      logger.infoLog(req)
      return res.json(created)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status).json({message: error.message})
    }
  }

  async find(req: IRequest, res: IResponse): Promise<Response<ISessionKey[]>> {
    try {
      // TODO: add filter, pagination, limit, sort and user
      const items = await this.service.find(req.query.filter)
      logger.infoLog(req)
      return res.json(items)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({message: error.message})
    }
  }

  async findOne(req: IRequest, res: IResponse): Promise<Response<ISessionKey>> {
    try {
      console.log(req.user, 'req.user')
      const item = await this.service.findOne(req.params._id)
      logger.infoLog(req)
      return res.json(item)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({message: error.message})
    }
  }

  async updateOne(req: IRequest, res: IResponse): Promise<Response<ISessionKey>> {
    try {
      const item = await this.service.updateOne(req.params._id, req.body)
      logger.infoLog(req)
      return res.json(item)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({message: error.message})
    }
  }

  async deleteOne(req: IRequest, res: IResponse): Promise<Response> {
    try {
      const deleted = await this.service.deleteOne(req.params._id)
      logger.infoLog(req)
      return res.json(deleted)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({message: error.message})
    }
  }
}
