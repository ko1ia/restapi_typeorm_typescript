import type { User } from '../../models/entity/User'
import type { IUserDTO } from '../interfaces'

class UserDTO implements IUserDTO {

  public id: number

  public email: string

  public isActive: boolean

  constructor (model: User) {
    this.id = model.id
    this.email = model.email
    this.isActive = model.isActive
  }

}

export { UserDTO }
