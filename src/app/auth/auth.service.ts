import {UserDa} from '../user/user.da'
import {HttpException} from '../../exceptions/HttpException'
import firebase from 'firebase-admin'
import {UserDto} from '../user/user.model'

export class AuthService {
  private userDa: UserDa
  constructor() {
    this.userDa = UserDa.getInstance()
  }


  async signUp(payload: UserDto) {
    const found = await this.userDa.findByEmail(payload.email)

    if (found) {
      throw new HttpException(400, 'User with this email already exists')
    }

    let uid: string
    try {
      const {uid: createdId}= await firebase.auth().createUser(payload)
      uid = createdId
    } catch (error) {
      console.error(error)
      throw new HttpException(400, 'User with this email already exists')
    }

    const {id} = await this.userDa.createOne({email: payload.email, firebaseId: uid, createdAt: new Date()})

    return await this.userDa.findOne(id)
  }

  async logout() {
    console.log('logout')
  }
  // login: RequestHandler = async (req, res: any) => {
  //   try {
  //
  //     const user: any = await this.database.collection('user').findOne({email: req.body.email})
  //
  //     if (!user) {
  //       return res.json({status: 400, message: 'User not found'})
  //     }
  //
  //
  //     return res.json(user)
  //   } catch (e) {
  //     console.error(e)
  //     return res.json({status: 400, message: 'Error'})
  //   }
  // }


  // signUp: RequestHandler = async (req, res) => {
  //   console.log('signUp')
  //   let user: any
  //
  //   try {
  //     user = await this.database.collection('user').findOne({email: req.body.email})
  //   } catch (e) {
  //     console.error(e)
  //     return res.json({status: 400, message: 'Error'})
  //
  //   }
  //   if (user) {
  //     return res.json({status: 400, message: 'User already exists'})
  //   }
  //
  //   try {
  //     user = await this.database.collection('user').insertOne( req.body)
  //   } catch (error) {
  //     console.error(error)
  //     return res.json({status: 400, message: error.message})
  //   }
  //
  //   return res.json(user)
  //
  // }
  //
  // logout: RequestHandler = async (req: any, res: any) => {
  //   const id = new Object(req.user._id)
  //   const user = await this.database.collection('user').findOne({_id: id})
  //
  //   if (!user) {
  //     return res.json({status: 400, message: 'User not found'})
  //   }
  //   return res.json({status: 200})
  // }
}
