import mongoose from 'mongoose'
import Mongoose from 'mongoose'

export interface IKey extends Mongoose.Document {
  name: string
  key: string
  user: string
  keyType: string
  expiration: Date
}

export interface IKeyModel extends Mongoose.Model<IKey> {}

export const KeySchema = new mongoose.Schema({
    name: {type: Mongoose.Schema.Types.String},
    key: {type: Mongoose.Schema.Types.String},
    keyType: {type: Mongoose.Schema.Types.String},
    user: {type: Mongoose.Schema.Types.ObjectId, ref: 'User'},
    expiration: {type: Mongoose.Schema.Types.Date},
  },
  {timestamps: true},)

const Key = mongoose.model('Key', KeySchema)

export default Key
