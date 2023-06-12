import {logger} from '../logger/tslogger'

export const validateRequest = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body)

        if (error) {
            logger.errorLog(req, error.details[0].message)
            return res.status(400).json({error: error.details[0].message})
        }
        next()
    }
}

export const validateParams = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.params)

        if (error) {
            logger.errorLog(req, error.details[0].message)
            return res.status(400).json({error: error.details[0].message})
        }
        next()
    }
}
