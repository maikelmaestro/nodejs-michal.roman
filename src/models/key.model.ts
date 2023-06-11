import {IBaseItem} from '../app/base/base-item.model'

export interface IKey extends IBaseItem {
  name: string
  key: string
  user: string
  keyType: string
  expiration: Date
}

