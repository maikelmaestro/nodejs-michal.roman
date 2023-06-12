import {ObjectId} from 'mongodb'

export interface IKey {
  _id?: ObjectId
  name: string
  key: string
  user: string
  keyType: string
  expiration: Date
}

