import {IListRequest, IRequest, IResponse} from '../app/shared/requests/requests.types'
import colors from 'colors'

export function loggerMiddleware(req: IRequest|IListRequest, res: IResponse, next) {
  const CONST_NOW = new Date()

  res.on('finish', () => {
    if (res.statusCode >= 400) {
      console.error(
        colors.red('[ERROR]'),
        CONST_NOW,
        'Endpoint:' + colors.red(req.url),
        'Code:' + colors.red(res.statusCode.toString()),
        'Method:' + colors.red(req.method.toUpperCase()),
        'Body:' + JSON.stringify(req.body),
        'Message:' + colors.red(res.statusMessage || '')
      )
    } else {
      console.log(
        colors.cyan('[INFO]'),
        CONST_NOW,
        'Endpoint:' + colors.cyan(req.url),
        'Code:' + colors.cyan(res.statusCode.toString()),
        'Method:' + colors.cyan(req.method.toUpperCase()),
        'Body:' + colors.cyan(JSON.stringify(req.body))
      )
    }
  })

  next()
}
