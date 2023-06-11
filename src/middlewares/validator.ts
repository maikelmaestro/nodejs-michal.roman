
export const validateRequest = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body)

        if (error) {
          return res.status(400).json({error: error.details[0].message})
        }
        next()
    }
}

export const validateParams = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.params)

        if (error) {
            return res.status(400).json({error: error.details[0].message})
        }
        next()
    }
}
