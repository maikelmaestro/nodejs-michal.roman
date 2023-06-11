export const call = (service: any, fn: 'find' | 'findOne' | 'createOne' | 'deleteOne' | 'updateOne') => (req, res, next) => service[fn](req, res, next)
