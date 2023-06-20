import {BaseService} from '../base/base.service'
import {UserDa} from './user.da'
import {IUser, UserDto} from './user.model'

export class UserService extends BaseService<IUser, UserDto> {
  private static instance: UserService

  constructor() {
    super(UserDa.getInstance())
  }

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }
}
