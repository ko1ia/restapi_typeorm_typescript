import type { IAuthRequest, RequestBody, IAuthResponse } from '../interfaces'
import type { Response } from 'express'

import { UserService } from '../../models/services'
import type { IUserService } from '../../models/services/interfaces/user'

class AuthController {

  private _userService: IUserService

  constructor () {
    this._userService = new UserService()
  }

  public async registration (req: RequestBody<IAuthRequest>, res: Response<unknown>): Promise<void> {
    const { email, password } = req.body

    const userData = await this._userService.registration({ email, password })
    res.cookie('refreshCookie', userData.refreshToken, { maxAge: 2592000000, httpOnly: true })
    res.json(userData)
  }

  // public async login (req: RequestBody<IAuthRequest>, res: Response): Promise<void> {
  //   const { email, password } = req.body
  //
  //   const user = await this._repository.findOneBy({ email })
  //
  //   if (user) {
  //     const isValidPassword = compareSync(password, user.password)
  //
  //     if (isValidPassword) {
  //       const accessToken = this._generateAccessToken(user)
  //       const refreshToken = this._generateRefreshToken(user)
  //
  //       res.json({ accessToken, refreshToken })
  //     } else {
  //       res.status(StatusCode.BAD_REQUEST).json({ message: 'Пароли не совпадают' })
  //     }
  //   } else {
  //     res.status(StatusCode.NOTFOUND).json({ message: 'Такого пользователя не сущевствует' })
  //   }
  // }

}

export { AuthController }
