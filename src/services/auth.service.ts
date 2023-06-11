import {RequestHandler} from 'express'
import {DBConnections} from './databases/DBConnections'
import {Db} from 'mongodb'

export class AuthService {
  constructor(protected database: Db) {
  }
  login: RequestHandler = async (req, res: any) => {
    try {

      const user: any = await this.database.collection('user').findOne({email: req.body.email})

      if (!user) {
        return res.json({status: 400, message: 'User not found'})
      }


      return res.json(user)
    } catch (e) {
      console.error(e)
      return res.json({status: 400, message: 'Error'})
    }
  }


  signUp: RequestHandler = async (req, res) => {
    console.log('signUp')
    let user: any

    try {
      user = await this.database.collection('user').findOne({email: req.body.email})
    } catch (e) {
      console.error(e)
      return res.json({status: 400, message: 'Error'})

    }
    if (user) {
      return res.json({status: 400, message: 'User already exists'})
    }

    try {
      user = await this.database.collection('user').insertOne( req.body)
    } catch (error) {
      console.error(error)
      return res.json({status: 400, message: error.message})
    }

    return res.json(user)

  }

  logout: RequestHandler = async (req: any, res: any) => {
    const id = new Object(req.user._id)
    const user = await this.database.collection('user').findOne({_id: id})

    if (!user) {
      return res.json({status: 400, message: 'User not found'})
    }
    return res.json({status: 200})
  }
}
