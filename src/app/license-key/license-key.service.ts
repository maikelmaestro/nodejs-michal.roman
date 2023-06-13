import {BaseService} from '../base/base.service'
import {LicenseKeyDa} from './license-key.da'
import {ILicenseKey, LicenseKeyDto} from './license-key.model'

export class LicenseKeyService extends BaseService<ILicenseKey, LicenseKeyDto> {
  private static instance: LicenseKeyService

  constructor() {
    super(LicenseKeyDa.getInstance())
  }

  static getInstance() {
    if (!LicenseKeyService.instance) {
      LicenseKeyService.instance = new LicenseKeyService()
    }
    return LicenseKeyService.instance
  }
}
