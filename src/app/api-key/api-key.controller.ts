import * as express from 'express'

import {Router} from 'express'
import {ApiKeyService} from './api-key.service'
import {apiKeyCreateSchema, apiKeyUpdateSchema, IApiKey} from './api-key.model'
import {validateParams, validateRequest} from '../../middlewares/validator.middleware'
import {firebaseAuthMiddleware} from '../../middlewares/firebase-auth.middleware'
import {IBaseController} from '../base/base.controller'
import {API_VERSION_PATH} from '../shared/api.consts'
import {COLLECTION_API_KEY} from '../shared/database.consts'
import {paramsSchema} from '../shared/query.validator'
import {CrudController} from '../base/crud.controller'

export class ApiKeyController extends CrudController<IApiKey> implements IBaseController {
  public router: Router = express.Router()
  path: string = API_VERSION_PATH
  collectionName: string = COLLECTION_API_KEY

  constructor(service: ApiKeyService) {
    super(service)
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
      validateRequest(apiKeyCreateSchema)
    ], this.call('createOne'))

    this.router.delete(`/${this.collectionName}/:_id`, [
      firebaseAuthMiddleware,
      validateParams(paramsSchema)
    ], this.call('deleteOne'))

    this.router.put(`/${this.collectionName}/:_id`, [
      firebaseAuthMiddleware,
      validateParams(paramsSchema),
      validateRequest(apiKeyUpdateSchema)
    ], this.call('updateOne'))
  }

  // async createOne(req: IRequest, res: IResponse): Promise<Response<IApiKey>> {
  //   const body = {...req.body}
  //   body.user = req.user as string || undefined
  //
  //   try {
  //     const created = await this.service.createOne(body)
  //     return res.json(created)
  //   } catch (error) {
  //     return res.status(error.status).json({message: error.message})
  //   }
  // }
  //
  // async find(req: IListRequest, res: IResponse): Promise<Response<IApiKey[]>> {
  //   let filter: any
  //
  //   if (req.query.filter?.length) {
  //     filter = JSON.parse(decodeURIComponent(req.query.filter))
  //   }
  //
  //   const sort = req.query.sort?.length ? JSON.parse(decodeURIComponent(req.query.sort)) : DEFAULT_SORT
  //
  //   if (req.user) {
  //     filter = {...filter, user: req.user}
  //   }
  //
  //   try {
  //     const items = await this.service.find({filter, sort})
  //     return res.json(items)
  //   } catch (error) {
  //     return res.status(error.status || 400).json({message: error.message})
  //   }
  // }
  //
  // async findOne(req: IRequest, res: IResponse): Promise<Response<IApiKey>> {
  //   try {
  //     const item = await this.service.findOne(req.params._id)
  //     return res.json(item)
  //   } catch (error) {
  //     return res.status(error.status || 400).json({message: error.message})
  //   }
  // }
  //
  // async updateOne(req: IRequest, res: IResponse): Promise<Response<IApiKey>> {
  //   try {
  //     const item = await this.service.updateOne(req.params._id, req.body)
  //     return res.json(item)
  //   } catch (error) {
  //     return res.status(error.status || 400).json({message: error.message})
  //   }
  // }
  //
  // async deleteOne(req: IRequest, res: IResponse): Promise<Response> {
  //   try {
  //     const deleted = await this.service.deleteOne(req.params._id)
  //     return res.json(deleted)
  //   } catch (error) {
  //     return res.status(error.status || 400).json({message: error.message})
  //   }
  // }
}
