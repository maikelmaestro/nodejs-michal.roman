import {BaseDto} from '../../base/dto/base.dto'

export interface ApiKeyDto extends BaseDto {
  name: string
  key: string
  keyType: string
  expiration: Date
}
