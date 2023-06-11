import {BaseController} from './base.controller'
import * as express from 'express'
import {ConfigFactory} from '../factories/configFactory'
import {API_VERSION} from '../shared/api.consts'
import {DBConnections} from '../services/databases/DBConnections'
import {call} from '../utils/call-function.utils'
import {validateParams, validateRequest} from '../middlewares/validator'
import {paramsSchema} from '../shared/query.validator'
import {apiKeyCreateSchema, apiKeyUpdateSchema} from '../models/api-key.model'
import {COLLECTION_LICENSE_KEY} from '../shared/database.consts'
import {LicenseKeyService} from '../services/license-key.service'
import {Router} from 'express'

export class LicenseKeyController implements BaseController {
  public router: Router = express.Router()
  path: string = API_VERSION
  collectionName: string = COLLECTION_LICENSE_KEY

  private readonly config = ConfigFactory.getConfig()

  constructor() {
    this.initRouter()
  }

  async initRouter() {
    const database = await DBConnections.getDatabase()

    const service = new LicenseKeyService(database, this.collectionName)

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
