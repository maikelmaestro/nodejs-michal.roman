import {ApiKeyDto, IApiKey} from './api-key.model'
import {ApiKeyDa} from './api-key.da'
import {BaseService} from '../base/base.service'

export class ApiKeyService extends BaseService<IApiKey, ApiKeyDto> {
  private static instance: ApiKeyService

  constructor() {
    super(ApiKeyDa.getInstance())
  }

  static getInstance(): ApiKeyService {
    if (!ApiKeyService.instance) {
      ApiKeyService.instance = new ApiKeyService()
    }
    return ApiKeyService.instance
  }
}
