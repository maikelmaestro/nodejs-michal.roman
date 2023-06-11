import Joi from 'joi'
import {ObjectId} from 'mongodb'


export interface IUser {
  _id: ObjectId
  email: string
  password?: string
  firstname?: string
  surname?: string
}

export const userAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const userUpdateSchema = Joi.object({
  firstname: Joi.string().optional(),
  surname: Joi.string().optional(),
})




