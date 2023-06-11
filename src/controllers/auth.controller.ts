import {BaseController} from './base.controller'
import * as express from 'express'
import {ConfigFactory} from '../factories/configFactory'
import {userAuthSchema} from '../models/user.model'
import {validateRequest} from '../middlewares/validator'
import {AuthService} from '../services/auth.service'
import {DBConnections} from '../services/databases/DBConnections'
import {API_VERSION} from '../shared/api.consts'

export class AuthController implements BaseController {
  public router = express.Router()
  path: string = API_VERSION

  constructor() {
    this.initRouter()
  }

  async initRouter() {
    const database = await DBConnections.getDatabase()
    const service = new AuthService(database)
    this.router.post('/login', [validateRequest(userAuthSchema)], service.login)
    this.router.post('/sign-up', [validateRequest(userAuthSchema)], service.signUp)
    this.router.post('/logout', service.logout)
  }

}
