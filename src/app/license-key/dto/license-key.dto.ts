import {BaseDto} from '../../base/dto/base.dto'

export interface LicenseKeyDto extends BaseDto {
  name: string
  key: string
  keyType: string
  expiration: Date
}
