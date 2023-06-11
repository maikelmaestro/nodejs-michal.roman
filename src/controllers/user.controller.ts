import {BaseController} from './base.controller'
import * as express from 'express'
import {API_VERSION} from '../shared/api.consts'
import {DBConnections} from '../services/databases/DBConnections'
import {call} from '../utils/call-function.utils'
import {validateParams, validateRequest} from '../middlewares/validator'
import {paramsSchema} from '../shared/query.validator'
import {COLLECTION_USER} from '../shared/database.consts'
import {LicenseKeyService} from '../services/license-key.service'
import {Router} from 'express'
import {licenseKeyCreateSchema} from '../models/license-key.model'
import {userUpdateSchema} from '../models/user.model'

export class UserController implements BaseController {
  public router: Router = express.Router()
  path: string = API_VERSION
  collectionName: string = COLLECTION_USER

  constructor() {
    this.initRouter()
  }

  async initRouter() {
    const database = await DBConnections.getDatabase()
    const service = new LicenseKeyService(database, this.collectionName)

    this.router.get(`/${this.collectionName}/:_id`, [
      validateParams(paramsSchema)
    ], call(service, 'findOne'))

    this.router.post(`/${this.collectionName}/`, [
      validateRequest(licenseKeyCreateSchema)
    ], call(service, 'createOne'))

    this.router.delete(`/${this.collectionName}/:_id`, [
      validateParams(paramsSchema)
    ], call(service, 'deleteOne'))

    this.router.put(`/${this.collectionName}/:_id`, [
      validateParams(paramsSchema),
      validateRequest(userUpdateSchema)
    ], call(service, 'updateOne'))
  }
}
