import {IApiKey} from './api-key.model'
import {COLLECTION_API_KEY} from '../../shared/database.consts'
import {BaseDa} from '../base/base.da'
import {ApiKeyDto} from './dto/api-key.dto'

export class ApiKeyDa extends BaseDa<IApiKey, ApiKeyDto>{

  constructor() {
    super(COLLECTION_API_KEY)
  }
}
