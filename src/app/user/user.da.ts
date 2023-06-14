import {BaseDa} from '../base/base.da'
import {IUser, UserDto} from './user.model'
import {COLLECTION_USER} from '../shared/database.consts'

export class UserDa extends BaseDa<IUser, UserDto> {
  private static instance: UserDa

  constructor() {
    super(COLLECTION_USER)
  }

  static getInstance() {
    if (!UserDa.instance) {
      UserDa.instance = new UserDa()
    }
    return UserDa.instance
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.database.collection(this.collectionName).findOne({email}) as IUser
  }

  async findByFirebaseId(firebaseId: string): Promise<IUser> {
    return await this.database.collection(this.collectionName).findOne({firebaseId}) as IUser
  }
}
