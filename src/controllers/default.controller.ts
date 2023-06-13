import * as express from 'express'
import {RequestHandler} from 'express'
import {ConfigFactory} from '../factories/configFactory'
import {DBConnections} from '../services/databases/DBConnections'
import {IBaseController} from '../app/base/base.controller'

export class DefaultController implements IBaseController {
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
}

