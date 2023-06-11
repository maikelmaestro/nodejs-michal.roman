import {IKey} from './key.model'
import Joi from 'joi'

export interface IApiKey extends IKey {}


export const apiKeyCreateSchema = Joi.object({
  name: Joi.string().required(),
  key: Joi.string().required(),
  user: Joi.string().required(),
  keyType: Joi.string().required(),
  expiration: Joi.date().required(),
})

export const apiKeyUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  key: Joi.string().optional(),
  keyType: Joi.string().optional(),
  expiration: Joi.date().optional(),
})




