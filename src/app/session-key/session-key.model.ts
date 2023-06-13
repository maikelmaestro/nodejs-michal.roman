import Joi from 'joi'
import {IKey} from '../key/key.model'
import {BaseDto} from '../base/base.model'

export interface ISessionKey extends IKey {
  users: string[]
  sessionId: string
}

export interface SessionKeyDto extends BaseDto {
  name: string
  key: string
  users: string[]
  sessionId: string
  expiration: Date
}

export const sessionKeyCreateSchema: Joi.ObjectSchema<ISessionKey> = Joi.object({
  name: Joi.string().required(),
  key: Joi.string().required(),
  expiration: Joi.date().required(),
  users: Joi.array().optional(),
})

export const sessionKeyUpdateSchema: Joi.ObjectSchema<ISessionKey> = Joi.object({
  name: Joi.string().optional(),
  key: Joi.string().optional(),
  expiration: Joi.date().optional(),
  users: Joi.array().optional(),
})




