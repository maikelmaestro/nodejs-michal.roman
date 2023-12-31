import Joi from 'joi'

export const paramsSchema = Joi.object({
  _id: Joi.string().required(),
})

const queryParamsSchema = Joi.object({
  filter: Joi.optional(),
  page: Joi.number().integer().positive().required(),
  limit: Joi.number().integer().positive().max(100),
})
