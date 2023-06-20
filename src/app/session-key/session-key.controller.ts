import * as express from 'express'

import {Router} from 'express'
import {validateParams, validateRequest} from '../../middlewares/validator.middleware'
import {firebaseAuthMiddleware} from '../../middlewares/firebase-auth.middleware'
import {IBaseController} from '../base/base.controller'
import {API_VERSION_PATH} from '../shared/api.consts'
import {COLLECTION_SESSION_KEY} from '../shared/database.consts'
import {paramsSchema} from '../shared/query.validator'
import {SessionKeyService} from './session-key.service'
import {ISessionKey, sessionKeyCreateSchema, sessionKeyUpdateSchema} from './session-key.model'
import {CrudController} from '../base/crud.controller'

export class SessionKeyController extends CrudController<ISessionKey> implements IBaseController {
  public router: Router = express.Router()
  path: string = API_VERSION_PATH
  collectionName: string = COLLECTION_SESSION_KEY

  constructor(service: SessionKeyService) {
    super(service)
    this.initRouter()
  }

  private call = fn => (req, res, next) => this[fn](req, res, next)

  async initRouter() {

    this.router.get(`/${this.collectionName}`, [
      firebaseAuthMiddleware
    ], this.call('findWithoutUserFilter'))

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
}
