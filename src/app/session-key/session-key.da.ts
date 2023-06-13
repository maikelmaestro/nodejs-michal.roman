import {BaseDa} from '../base/base.da'
import {COLLECTION_SESSION_KEY} from '../shared/database.consts'
import {ISessionKey, SessionKeyDto} from './session-key.model'

export class SessionKeyDa extends BaseDa<ISessionKey, SessionKeyDto>{
  private static instance: SessionKeyDa

  constructor() {
    super(COLLECTION_SESSION_KEY)
  }

  static getInstance(): SessionKeyDa {
    if (!SessionKeyDa.instance) {
      SessionKeyDa.instance = new SessionKeyDa()
    }
    return SessionKeyDa.instance
  }
}
