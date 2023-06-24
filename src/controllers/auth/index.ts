import { UserService } from '../../models/services'

import type { IUserService } from '../../models/services/interfaces/user'
import type { IAuthRequest, RequestBody } from '../interfaces'
import type { NextFunction, Response } from 'express'

class AuthController {

  private _userService: IUserService

  constructor () {
    this._userService = new UserService()
  }

  public async registration (req: RequestBody<IAuthRequest>, res: Response<unknown>, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body

      const userData = await this._userService.registration({ email, password })
      res.cookie('refreshCookie', userData.refreshToken, { maxAge: 2592000000, httpOnly: true })
      res.json(userData)
    } catch (e) {
      next(e)
    }
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
