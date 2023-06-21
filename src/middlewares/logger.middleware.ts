import {IListRequest, IRequest, IResponse} from '../app/shared/requests/requests.types'
import colors from 'colors'
import moment from 'moment/moment'

export function loggerMiddleware(req: IRequest|IListRequest, res: IResponse, next) {
  const CONST_NOW: string = moment().format('DD.MM.YYYY HH:mm:ss')

  res.on('finish', () => {
    if (res.statusCode >= 400) {
      console.error(
        colors.dim(CONST_NOW),
        colors.red('[ERROR]'),
        'Endpoint:' + colors.red(req.url),
        'Code:' + colors.red(res.statusCode.toString()),
        'Method:' + colors.red(req.method.toUpperCase()),
        'Body:' + JSON.stringify(req.body),
        'Message:' + colors.red(res.statusMessage || '')
      )
    } else {
      console.log(
        colors.dim(CONST_NOW),
        colors.cyan('[INFO]'),
        'Endpoint:' + colors.cyan(req.url),
        'Code:' + colors.cyan(res.statusCode.toString()),
        'Method:' + colors.cyan(req.method.toUpperCase()),
        'Body:' + colors.cyan(JSON.stringify(req.body))
      )
    }
  })

  next()
}
