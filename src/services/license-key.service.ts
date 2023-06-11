import {BaseService} from '../shared/base/base.service'
import {Db} from 'mongodb'
import {ILicenseKey} from '../models/license-key.model'

export class LicenseKeyService extends BaseService<ILicenseKey>{
  constructor(database: Db, collectionName: string) {
    super(database, collectionName)
  }
}
