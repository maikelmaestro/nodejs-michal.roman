import colors from 'colors'
import {checkRouteMethods} from '../app/utils/checkRouteMethods'

class DRLogger {

  constructor() {
  }

  public info = console.log
  public success = console.log
  public warn = console.warn
  public error = console.error
  public fatal = console.error
  private now = new Date()

  infoLog = (req) => {
    const {model, method} = checkRouteMethods(req)
    console.log(
      colors.cyan('[INFO]'),
      this.now,
      'Endpoint:' + colors.cyan(model),
      'Method:' + colors.cyan(method.toUpperCase()),
      'Body:' + JSON.stringify(req.body))
  }

  successLog = (req) => {
    const {model, method} = checkRouteMethods(req)
    console.log(
      colors.green('[SUCCESS]'),
      this.now,
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
      colors.red('[ERROR]'),
      this.now,
      'Endpoint:' + colors.red(model),
      'Method:' + colors.red(method.toUpperCase()),
      'Body:' + JSON.stringify(req.body),
      'Message:' + colors.red(message || ''))
  }

  fatalLog = (req) => {
    const {model, method} = checkRouteMethods(req)
    console.error(
      colors.red('[FATAL]'),
      this.now,
      'Endpoint:' + colors.red(model),
      'Method:' + colors.red(method.toUpperCase()),
      'Body:' + JSON.stringify(req.body))
  }
}

export const logger = new DRLogger()


