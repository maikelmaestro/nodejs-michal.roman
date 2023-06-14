import * as express from 'express'

import {IBaseController} from '../base/base.controller'
import {validateRequest} from '../../middlewares/validator.middleware'
import {userAuthSchema} from '../user/user.model'
import {AuthService} from './auth.service'
import {Request, Response} from 'express'
import {logger} from '../../logger/tslogger'
import {API_VERSION_PATH} from '../shared/api.consts'
import {IResponse} from '../shared/requests/requests.types'

export class AuthController implements IBaseController {
  public router = express.Router()
  path: string = API_VERSION_PATH
  private service: AuthService = new AuthService()
  constructor() {
    this.initRouter()
  }

  private call = fn => (req, res, next) => this[fn](req, res, next)

  async initRouter() {
    this.router.post(`/sign-up`, [
      validateRequest(userAuthSchema)
    ], this.call('signUp'))

    this.router.post(`/logout`, [
    ], this.call('logout'))
  }

  async signUp(req: Request, res: IResponse) {
    try {
      const user = await this.service.signUp(req.body)
      logger.infoLog(req)
      return res.json(user)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({ message: error.message})
    }
  }

  async logout(req: Request, res: IResponse) {
    try {
      const user = await this.service.logout()
      logger.infoLog(req)
      return res.json(user)
    } catch (error) {
      logger.errorLog(req, error.message)
      return res.status(error.status || 400).json({ message: error.message})
    }
  }

}
