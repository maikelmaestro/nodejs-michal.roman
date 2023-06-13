import Joi from 'joi'
import {IKey} from '../key/key.model'
import {BaseDto} from '../base/base.model'

export interface IApiKey extends IKey {
  keyType: string
}

export interface ApiKeyDto extends BaseDto {
  name?: string
  key?: string
  keyType?: string
  expiration?: Date
}

export const apiKeyCreateSchema: Joi.ObjectSchema<ApiKeyDto> = Joi.object({
  name: Joi.string().required(),
  key: Joi.string().required(),
  keyType: Joi.string().required(),
  expiration: Joi.date().required(),
})

export const apiKeyUpdateSchema: Joi.ObjectSchema<ApiKeyDto> = Joi.object({
  name: Joi.string().optional(),
  key: Joi.string().optional(),
  keyType: Joi.string().optional(),
  expiration: Joi.date().optional(),
})




