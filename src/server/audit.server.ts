import express from 'express'
import cors from 'cors'
import {errorHandlerMiddleware} from "../middlewares/errorHandler.middleware"
import {logger} from '../logger/tslogger'

import {locationMiddleware} from "../middlewares/location.middleware"
import {serverMiddleware} from "../middlewares/server.middleware"
import process from "process"
import colors from 'colors'
import {firebaseApp} from '../firebase'
import {IBaseController} from '../app/base/base.controller'
import {loggerMiddleware} from '../middlewares/logger.middleware'

const bodyParser = require('body-parser')
const helmet = require('helmet')
const enforce = require('express-sslify')

export class AuditServer {
    public app: express.Application
    public port: number

    constructor(port, controllers: IBaseController[]) {

        this.app = express()
        this.app.use(helmet())
        this.app.use(serverMiddleware)
        this.app.use(locationMiddleware)
        this.app.use(loggerMiddleware)

        firebaseApp()

        if (process.env.FORCE_HTTPS && process.env.FORCE_HTTPS === "true") {
            this.app.use(enforce.HTTPS({trustProtoHeader: true}))
        }

        this.port = port

        this.app.use(bodyParser.json({limit: "100mb"}))
        this.app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}))

        this.app.use(express.json())
        this.app.use(cors())

        this.initControllers(controllers)
        this.app.use(errorHandlerMiddleware)
        this.showLocation()
    }

    showLocation() {
        const location: string = process.env.LOCATION
        if (location) {
            logger.info('Location: ', location)
        }
    }

    public listen() {
        return this.app.listen(this.port, () => {
            logger.info(colors.green(`DecisionRules audit server listening on the port ${this.port}`))
        })
    }

    private initControllers(controllers: IBaseController[]) {
        controllers.forEach(controller => {
            this.app.use(controller.path, controller.router)
        })
    }
}

