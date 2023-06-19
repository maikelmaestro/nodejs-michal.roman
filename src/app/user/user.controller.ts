import * as express from 'express'

import {Response, Router} from 'express'
import {validateParams, validateRequest} from '../../middlewares/validator.middleware'
import {firebaseAuthMiddleware} from '../../middlewares/firebase-auth.middleware'
import {IBaseController} from '../base/base.controller'
import {API_VERSION_PATH, DEFAULT_SORT} from '../shared/api.consts'
import {COLLECTION_USER} from '../shared/database.consts'
import {paramsSchema} from '../shared/query.validator'
import {IListRequest, IRequest, IResponse} from '../shared/requests/requests.types'
import {UserService} from './user.service'
import {IUser, userCreateSchema, userUpdateSchema} from './user.model'
import {CrudController} from '../base/crud.controller'

export class UserController extends CrudController<IUser> implements IBaseController {
  public router: Router = express.Router()
  path: string = API_VERSION_PATH
  collectionName: string = COLLECTION_USER

  constructor(service: UserService) {
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
      validateRequest(userCreateSchema)
    ], this.call('createOneWithoutUserFilter'))

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
}
