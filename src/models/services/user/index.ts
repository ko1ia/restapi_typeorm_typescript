import { hashSync } from 'bcryptjs'

import { DataBase } from '../../../data-access'
import { UserDTO } from '../../../dtos'
import { ApiError } from '../../../utils'
import { User } from '../../entity/User'
import { TokenService } from '../token'

import type { IRegisterPayload, IUserService } from '../interfaces/user'

const UserModel = DataBase.getRepository(User)
const tokenService = new TokenService()

class UserService implements IUserService {

  public async registration (payload: IRegisterPayload): Promise<unknown> {
    const { email, password } = payload

    const candidate = await UserModel.findOneBy({ email })
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
    }

    const hashPassword = hashSync(password)
    const newUser = UserModel.create({ email, password: hashPassword })

    const user = await newUser.save()
    const userDTO = new UserDTO(user)

    const tokens = tokenService.generateTokens({ ...userDTO })
    await tokenService.saveToken(user, tokens.refreshToken)

    return { ...tokens, user: userDTO }
  }

}

export { UserService }
