import {IBaseController} from './base.controller'
import * as express from 'express'
import {userAuthSchema} from '../models/user.model'
import {validateRequest} from '../middlewares/validator.middleware'
import {AuthService} from '../services/auth.service'
import {DBConnections} from '../services/databases/DBConnections'
import {API_VERSION_PATH} from '../shared/api.consts'

export class AuthController implements IBaseController {
  public router = express.Router()
  path: string = API_VERSION_PATH

  constructor() {
    this.initRouter()
  }

  async initRouter() {
    // TODO: Change auth routes
    const database = await DBConnections.getDatabase()
    const service = new AuthService(database)
    this.router.post('/login', [validateRequest(userAuthSchema)], service.login)
    this.router.post('/sign-up', [validateRequest(userAuthSchema)], service.signUp)
    this.router.post('/logout', service.logout)
  }

}
