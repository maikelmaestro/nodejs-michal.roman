import {BaseService} from '../shared/base/base.service'
import {Db} from 'mongodb'
import {IApiKey} from '../models/api-key.model'

export class ApiKeyService extends BaseService<IApiKey>{
  constructor(database: Db, collectionName: string) {
    super(database, collectionName)
  }
}
