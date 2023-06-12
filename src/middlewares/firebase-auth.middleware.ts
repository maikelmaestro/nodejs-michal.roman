import {NextFunction, Request, Response} from 'express'
import firebase from 'firebase-admin'
import {logger} from '../logger/tslogger'

export function firebaseAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const headerToken = req.headers.authorization

  if (!headerToken) {
    return res.send({message: 'No token provided'}).status(401)
  }

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    res.send({message: 'Invalid token'}).status(401)
  }

  const token = headerToken.split(' ')[1]
  firebase
    .auth()
    .verifyIdToken(token)
    .then(() => next())
    .catch((error) => {
      logger.errorLog(req, error.message)
      res.send({message: 'Could not authorize'}).status(403)
    })

}
