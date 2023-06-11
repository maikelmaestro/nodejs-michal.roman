import {BaseController} from './base.controller'
import * as express from 'express'
import {DBConnections} from '../services/databases/DBConnections'
import {ApiKeyService} from '../services/api-key.service'
import {COLLECTION_API_KEY} from '../shared/database.consts'
import {validateParams, validateRequest} from '../middlewares/validator'
import {apiKeyCreateSchema, apiKeyUpdateSchema} from '../models/api-key.model'
import {paramsSchema} from '../shared/query.validator'
import {call} from '../utils/call-function.utils'
import {API_VERSION} from '../shared/api.consts'

export class ApiKeyController implements BaseController {
  public router = express.Router()
  path: string = API_VERSION
  collectionName: string = COLLECTION_API_KEY

  constructor() {
    this.initRouter()
  }

  async initRouter() {
    const database = await DBConnections.getDatabase()

    const service = new ApiKeyService(database, this.collectionName)

    this.router.get(`/${this.collectionName}`, [
    ], call(service, 'find'))

    this.router.get(`/${this.collectionName}/:_id`, [
      validateParams(paramsSchema)
    ], call(service, 'findOne'))

    this.router.post(`/${this.collectionName}/`, [
      validateRequest(apiKeyCreateSchema)
    ], call(service, 'createOne'))

    this.router.delete(`/${this.collectionName}/:_id`, [
      validateParams(paramsSchema)
    ], call(service, 'deleteOne'))

    this.router.put(`/${this.collectionName}/:_id`, [
      validateParams(paramsSchema),
      validateRequest(apiKeyUpdateSchema)
    ], call(service, 'updateOne'))
  }
}
