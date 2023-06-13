import {ApiKeyDto, IApiKey} from './api-key.model'
import {BaseDa} from '../base/base.da'
import {COLLECTION_API_KEY} from '../shared/database.consts'

export class ApiKeyDa extends BaseDa<IApiKey, ApiKeyDto> {
  private static instance: ApiKeyDa

  constructor() {
    super(COLLECTION_API_KEY)
  }

  static getInstance(): ApiKeyDa {
    if (!ApiKeyDa.instance) {
      ApiKeyDa.instance = new ApiKeyDa()
    }
    return ApiKeyDa.instance
  }
}
