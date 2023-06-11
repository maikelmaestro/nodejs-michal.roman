import {BaseController} from './base.controller'
import * as express from 'express'
import {RequestHandler} from 'express'
import {ConfigFactory} from '../factories/configFactory'
import {DBConnections} from '../services/databases/DBConnections'
import {BaseService} from '../shared/base/base.service'
import colors from 'colors'

export class DefaultController implements BaseController {
  public router = express.Router()
  path = '/'

  private readonly config = ConfigFactory.getConfig()

  constructor() {
    this.initRouter()
  }

  initRouter(): void {
    this.router.get('/api/v1', this.indexHandler)
    this.router.get('/api/v1/health-check', this.getHealthCheck)
    // this.router.use('/', apiKeyRouter)
  }

  indexHandler: RequestHandler = async (req, res) => {
    res.redirect(this.config.landingPageUrl)
  }


  getHealthCheck: RequestHandler = async (req, res) => {
    if (DBConnections.isConnected === false) {
      res.status(500).send('Database is not connected')
      return
    }
    res.status(200).send('Audit server is running on version: ' + this.config.version)
  }

  // setupCrud(router: express.Router, path: string, service: BaseService<any>, crudParams: {
  //   find?: any;
  //   findOne?: any;
  //   createOne?: any;
  //   updateOne?: any;
  //   deleteOne?: any
  // }): void {
  //   try {
  //     if (crudParams.find) {
  //       router.get(`/api/v1/${path}`, [
  //         // crudParams.find.auth === false ? null : AuthController.isAuthenticated,
  //         ...crudParams.find.middlewares || []
  //       ].filter(i => i), (req: express.Request, res: express.Response) => service.find(req, res))
  //     }
  //
  //     if (crudParams.findOne) {
  //       router.get(`/api/v1/${path}/:_id`, [
  //         // crudParams.findOne.auth === false ? null : AuthController.isAuthenticated,
  //         ...crudParams.findOne.middlewares || []
  //       ].filter(i => i), (req: express.Request, res: express.Response) => service.findOne(req, res))
  //     }
  //
  //     if (crudParams.createOne) {
  //       router.post(`/api/v1/${path}`, [
  //         // crudParams.createOne.auth === false ? null : AuthController.isAuthenticated,
  //         ...crudParams.createOne.middlewares || []
  //       ].filter(i => i), (req: express.Request, res: express.Response) => service.createOne(req, res))
  //     }
  //
  //     if (crudParams.updateOne) {
  //       router.put(`/api/v1/${path}/:_id`, [
  //         // crudParams.updateOne.auth === false ? null : AuthController.isAuthenticated,
  //         ...crudParams.updateOne.middlewares || []
  //       ].filter(i => i), (req: express.Request, res: express.Response) => service.updateOne(req, res))
  //     }
  //
  //     if (crudParams.deleteOne) {
  //       router.delete(`/api/v1/${path}/:_id`, [
  //         // crudParams.deleteOne.auth === false ? null : AuthController.isAuthenticated,
  //         ...crudParams.deleteOne.middlewares || []
  //       ].filter(i => i), (req: express.Request, res: express.Response) => service.deleteOne(req, res))
  //     }
  //   } catch (e) {
  //     console.error(colors.red(`Cannot setupCrud crud on "${path}" because ${e}`))
  //     console.error(colors.magenta(`crudParams: ${JSON.stringify(crudParams)}`))
  //     console.log(colors.grey('_____________________________________________________________________'))
  //   }
  // }
}

