import {COLLECTION_API_KEY} from '../../shared/database.consts'
import {BaseDa} from '../base/base.da'
import {ILicenseKey} from './license-key.model'
import {LicenseKeyDto} from './dto/license-key.dto'

export class LicenseKeyDa extends BaseDa<ILicenseKey, LicenseKeyDto> {

  constructor() {
    super(COLLECTION_API_KEY)
  }
}
