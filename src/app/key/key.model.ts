import {IBaseItem} from '../base/base.model'

export interface IKey extends IBaseItem {
  name: string
  key: string
  user: string
  keyType: string
  expiration: Date
}

