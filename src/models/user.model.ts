import Joi from 'joi'

export const userAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const userUpdateSchema = Joi.object({
  firstname: Joi.string().optional(),
  surname: Joi.string().optional(),
})




