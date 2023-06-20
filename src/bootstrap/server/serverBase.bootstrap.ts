// Base bootstrap class for server init.
// This class contains all shared operations with basic implementation for both subclasses.
// Do not use this class directly. Use it as parent class.
// Cloud version is used as base version, so little changes in cloud subclass.
import {IServerInstances} from '../../interfaces/IServerInstances'
import {AuditServer} from '../../server/audit.server'
import express from 'express'
import {ApiKeyController} from '../../app/api-key/api-key.controller'
import {LicenseKeyController} from '../../app/license-key/license-key.controller'
import {AuthController} from '../../app/auth/auth.controller'
import {ApiKeyService} from '../../app/api-key/api-key.service'
import {LicenseKeyService} from '../../app/license-key/license-key.service'
import {SessionKeyController} from '../../app/session-key/session-key.controller'
import {SessionKeyService} from '../../app/session-key/session-key.service'
import {UserService} from '../../app/user/user.service'
import {UserController} from '../../app/user/user.controller'

export class ServerBaseBootstrap {

  protected workers: number
  protected server: AuditServer

  constructor() {
    this.workers = Number.parseInt(process.env.WORKERS_NUMBER) || 1
  }

  /**
   * Function that serves as a template for server init.
   * @protected
   *
   * @returns {Promise<IServerInstances>} Return value is promise due to async character of the method.
   */
  protected async start(): Promise<IServerInstances> {
    return
  }

  /**
   * Base method for server init derivative from old cloud settings.
   * @protected
   *
   * @returns {express.Application}
   */
  protected initServer(): express.Application {
    const port = process.env.PORT || 3000
    const apiKeyService: ApiKeyService = ApiKeyService.getInstance()
    const licenseKeyService: LicenseKeyService = LicenseKeyService.getInstance()
    const sessionKeyService: SessionKeyService = SessionKeyService.getInstance()
    const userService: UserService = UserService.getInstance()

    this.server = new AuditServer(Number.parseInt(port.toString()), [
        new ApiKeyController(apiKeyService),
        new LicenseKeyController(licenseKeyService),
        new SessionKeyController(sessionKeyService),
        new UserController(userService),
        new AuthController()
      ]
    )

    // const db = new DBConnections()
    this.server.listen()
    return this.server.app
  }
}
