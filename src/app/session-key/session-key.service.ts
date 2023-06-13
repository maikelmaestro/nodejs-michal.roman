import {BaseService} from '../base/base.service'
import {ISessionKey, SessionKeyDto} from './session-key.model'
import {SessionKeyDa} from './session-key.da'

export class SessionKeyService extends BaseService<ISessionKey, SessionKeyDto> {
  private static instance: SessionKeyService

  constructor() {
    super(SessionKeyDa.getInstance())
  }

  static getInstance() {
    if (!SessionKeyService.instance) {
      SessionKeyService.instance = new SessionKeyService()
    }
    return SessionKeyService.instance
  }

  async find(options: any): Promise<ISessionKey[]> {
    return await this.dataAccess.find(options)
  }
}
