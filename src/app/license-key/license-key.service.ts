
import {BaseService} from '../base/base.service'
import {LicenseKeyDa} from './license-key.da'
import {LicenseKeyDto} from './dto/license-key.dto'
import {ILicenseKey} from './license-key.model'

export class LicenseKeyService extends BaseService<ILicenseKey, LicenseKeyDto>{
  constructor() {
    super(new LicenseKeyDa())
  }
}
