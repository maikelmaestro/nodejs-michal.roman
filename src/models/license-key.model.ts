import {IKey} from './key.model'
import Joi from 'joi'

export interface ILicenseKey extends IKey {}


export const licenseKeyCreateSchema = Joi.object({
  name: Joi.string().required(),
  key: Joi.string().required(),
  user: Joi.string().required(),
  keyType: Joi.string().required(),
  expiration: Joi.date().required(),
})

export const licenseKeyUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  key: Joi.string().optional(),
  keyType: Joi.string().optional(),
  expiration: Joi.date().optional(),
})
