import Joi from 'joi'
import {BaseDto, IBaseItem} from '../base/base.model'

export interface IUser extends IBaseItem {
  email: string
  firebaseId: string
  firstname: string
  surname: string
}

export interface UserDto extends BaseDto {
  firebaseId?: string
  email?: string
  password?: string
  firstname?: string
  surname?: string
}

export const userAuthSchema: Joi.ObjectSchema<UserDto> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const userCreateSchema: Joi.ObjectSchema<UserDto> = Joi.object({
  email: Joi.string().email().required(),
  firebaseId: Joi.string().required(),
  firstname: Joi.string(),
  surname: Joi.string(),
})


export const userUpdateSchema = Joi.object({
  firstname: Joi.string().optional(),
  surname: Joi.string().optional(),
})
