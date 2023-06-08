import mongoose from 'mongoose'
import Mongoose from 'mongoose'

export interface IUser extends Mongoose.Document {
  name: string
  key: string
  user: string
  keyType: string
  expiration: Date
}

export interface IUserModel extends Mongoose.Model<IUser> {}

const Schema = new mongoose.Schema({
    name: {type: Mongoose.Schema.Types.String},
    firstname: {type: Mongoose.Schema.Types.String},
    surname: {type: Mongoose.Schema.Types.String},
    email: {type: Mongoose.Schema.Types.String}
  },
  {timestamps: true},)

const User = mongoose.model('User', Schema)

export default User
