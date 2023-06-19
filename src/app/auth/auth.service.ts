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
}
