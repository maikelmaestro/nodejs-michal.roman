import {BaseDa} from '../base/base.da'
import {ILicenseKey, LicenseKeyDto} from './license-key.model'
import {COLLECTION_LICENSE_KEY} from '../shared/database.consts'

export class LicenseKeyDa extends BaseDa<ILicenseKey, LicenseKeyDto> {
  private static instance: LicenseKeyDa

  constructor() {
    super(COLLECTION_LICENSE_KEY)
  }

  static getInstance(): LicenseKeyDa {
    if (!LicenseKeyDa.instance) {
      LicenseKeyDa.instance = new LicenseKeyDa()
    }
    return LicenseKeyDa.instance
  }
}
