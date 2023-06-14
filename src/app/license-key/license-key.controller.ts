import * as express from 'express'

import {Request, Response, Router} from 'express'
import {validateParams, validateRequest} from '../../middlewares/validator.middleware'
import {logger} from '../../logger/tslogger'
import {LicenseKeyService} from './license-key.service'
import {ILicenseKey, licenseKeyCreateSchema, licenseKeyUpdateSchema} from './license-key.model'
import {IBaseController} from '../base/base.controller'
import {API_VERSION_PATH, DEFAULT_SORT} from '../shared/api.consts'
import {COLLECTION_LICENSE_KEY} from '../shared/database.consts'
import {paramsSchema} from '../shared/query.validator'
import {IListRequest, IRequest, IResponse} from '../shared/requests/requests.types'
import {firebaseAuthMiddleware} from '../../middlewares/firebase-auth.middleware'

export class LicenseKeyController implements IBaseController {
  public router: Router = express.Router()
  path: string = API_VERSION_PATH
  collectionName: string = COLLECTION_LICENSE_KEY

  constructor(private service: LicenseKeyService) {
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

  async createOne(req: IRequest, res: IResponse): Promise<Response<ILicenseKey>> {
    const body = {...req.body}
    body.user = req.user as string || undefined

    try {
      const created = await this.service.createOne(body)
      logger.infoLog(req)
      return res.json(created)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({ message: error.message})
    }
  }

  async find(req: IListRequest, res: IResponse): Promise<Response<ILicenseKey[]>> {
    let filter: any

    if (req.query.filter?.length) {
      filter = JSON.parse(decodeURIComponent(req.query.filter))
    }

    const sort = req.query.sort?.length ? JSON.parse(decodeURIComponent(req.query.sort)) : DEFAULT_SORT

    if (req.user) {
      filter = {...filter, user: req.user}
    }

    try {
      const items = await this.service.find({filter, sort})
      return res.json(items)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({ message: error.message})
    }
  }

  async findOne(req: IRequest, res: IResponse): Promise<Response<ILicenseKey>> {
    try {
      const item = await this.service.findOne(req.params._id)
      return res.json(item)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({ message: error.message})
    }
  }

  async updateOne(req: IRequest, res: IResponse): Promise<Response<ILicenseKey>> {
    try {
      const item = await this.service.updateOne(req.params._id, req.body)
      return res.json(item)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({ message: error.message})
    }
  }

  async deleteOne(req: IRequest, res: IResponse): Promise<Response> {
    try {
      const deleted = await this.service.deleteOne(req.params._id)
      return res.json(deleted)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({ message: error.message})
    }
  }
}
