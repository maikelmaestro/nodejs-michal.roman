import colors from 'colors'
import {checkRouteMethods} from '../app/utils/checkRouteMethods'
import moment from 'moment'

class DRLogger {

  constructor() {
  }

  public info = console.log
  public success = console.log
  public warn = console.warn
  public error = console.error
  public fatal = console.error
  private now = moment().format('DD.MM.YYYY HH:mm:ss')

  infoLog = (req) => {
    const {model, method} = checkRouteMethods(req)
    console.log(
      colors.dim(this.now),
      colors.cyan('[INFO]'),
      'Endpoint:' + colors.cyan(model),
      'Method:' + colors.cyan(method.toUpperCase()),
      'Body:' + JSON.stringify(req.body))
  }

  successLog = (req) => {
    const {model, method} = checkRouteMethods(req)
    console.log(
      colors.dim(this.now),
      colors.green('[SUCCESS]'),
      'Endpoint:' + colors.green(model),
      'Method:' + colors.green(method.toUpperCase()),
      'Body:' + JSON.stringify(req.body))
  }

  warnLog = (req) => {
    const {model, method} = checkRouteMethods(req)
    console.warn(
      colors.yellow('[WARN]'),
      this.now,
      'Endpoint:' + colors.yellow(model),
      'Method:' + colors.yellow(method.toUpperCase()),
      'Body:' + JSON.stringify(req.body))
  }

  errorLog = (req, message?) => {
    const {model, method} = checkRouteMethods(req)
    console.error(
      colors.dim(this.now),
      colors.red('[ERROR]'),
      'Endpoint:' + colors.red(model),
      'Method:' + colors.red(method.toUpperCase()),
      'Body:' + JSON.stringify(req.body),
      'Message:' + colors.red(message || ''))
  }

  fatalLog = (req) => {
    const {model, method} = checkRouteMethods(req)
    console.error(
      colors.dim(this.now),
      colors.red('[FATAL]'),
      'Endpoint:' + colors.red(model),
      'Method:' + colors.red(method.toUpperCase()),
      'Body:' + JSON.stringify(req.body))
  }
}

export const logger = new DRLogger()


