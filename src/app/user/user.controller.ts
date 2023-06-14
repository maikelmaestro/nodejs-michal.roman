import * as express from 'express'

import {Response, Router} from 'express'
import {validateParams, validateRequest} from '../../middlewares/validator.middleware'
import {logger} from '../../logger/tslogger'
import {firebaseAuthMiddleware} from '../../middlewares/firebase-auth.middleware'
import {IBaseController} from '../base/base.controller'
import {API_VERSION_PATH, DEFAULT_SORT} from '../shared/api.consts'
import {COLLECTION_USER} from '../shared/database.consts'
import {paramsSchema} from '../shared/query.validator'
import {IListRequest, IRequest, IResponse} from '../shared/requests/requests.types'
import {UserService} from './user.service'
import {IUser, userCreateSchema, userUpdateSchema} from './user.model'

export class UserController implements IBaseController {
  public router: Router = express.Router()
  path: string = API_VERSION_PATH
  collectionName: string = COLLECTION_USER

  constructor(private service: UserService) {
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
      validateRequest(userCreateSchema)
    ], this.call('createOne'))

    this.router.delete(`/${this.collectionName}/:_id`, [
      firebaseAuthMiddleware,
      validateParams(paramsSchema)
    ], this.call('deleteOne'))

    this.router.put(`/${this.collectionName}/:_id`, [
      firebaseAuthMiddleware,
      validateParams(paramsSchema),
      validateRequest(userUpdateSchema)
    ], this.call('updateOne'))
  }

  async createOne(req: IRequest, res: IResponse): Promise<Response<IUser>> {
    try {
      const created = await this.service.createOne(req.body)
      logger.infoLog(req)
      return res.json(created)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status).json({message: error.message})
    }
  }

  async find(req: IListRequest, res: IResponse): Promise<Response<IUser[]>> {
    let filter: any

    if (req.query.filter?.length) {
      filter = JSON.parse(decodeURIComponent(req.query.filter))
    }

    const sort = req.query.sort?.length ? JSON.parse(decodeURIComponent(req.query.sort)) : DEFAULT_SORT

    try {
      const items = await this.service.find({filter, sort})
      logger.infoLog(req)
      return res.json(items)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({message: error.message})
    }
  }

  async findOne(req: IRequest, res: IResponse): Promise<Response<IUser>> {
    try {
      const item = await this.service.findOne(req.params._id)
      logger.infoLog(req)
      return res.json(item)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({message: error.message})
    }
  }

  async updateOne(req: IRequest, res: IResponse): Promise<Response<IUser>> {
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
