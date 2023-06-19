import * as express from 'express'
import {Response, Router} from 'express'
import {validateParams, validateRequest} from '../../middlewares/validator.middleware'
import {LicenseKeyService} from './license-key.service'
import {ILicenseKey, licenseKeyCreateSchema, licenseKeyUpdateSchema} from './license-key.model'
import {IBaseController} from '../base/base.controller'
import {API_VERSION_PATH, DEFAULT_SORT} from '../shared/api.consts'
import {COLLECTION_LICENSE_KEY} from '../shared/database.consts'
import {paramsSchema} from '../shared/query.validator'
import {firebaseAuthMiddleware} from '../../middlewares/firebase-auth.middleware'
import {CrudController} from '../base/crud.controller'

export class LicenseKeyController extends CrudController<ILicenseKey> implements IBaseController {
  public router: Router = express.Router()
  path: string = API_VERSION_PATH
  collectionName: string = COLLECTION_LICENSE_KEY

  constructor(service: LicenseKeyService) {
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
      validateRequest(licenseKeyCreateSchema)
    ], this.call('createOne'))

    this.router.delete(`/${this.collectionName}/:_id`, [
      firebaseAuthMiddleware,
      validateParams(paramsSchema)
    ], this.call('deleteOne'))

    this.router.put(`/${this.collectionName}/:_id`, [
      firebaseAuthMiddleware,
      validateParams(paramsSchema),
      validateRequest(licenseKeyUpdateSchema)
    ], this.call('updateOne'))
  }
}
