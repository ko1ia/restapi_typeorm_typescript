import { sign } from 'jsonwebtoken'
import type { IAuthRequest, IAuthResponse, RequestBody } from '../interfaces'
import type { Response } from 'express'
import { User } from '../../models/entity/User'
import type { Repository } from 'typeorm'
import { DataBase } from '../../data-access'
import { StatusCode } from '../enums/auth'

import { hashSync, compareSync } from 'bcryptjs'

class AuthController {

  private _repository: Repository<User>

  constructor () {
    this._repository = DataBase.getRepository(User)
  }

  public async registration (req: RequestBody<IAuthRequest>, res: Response<IAuthResponse>): Promise<void> {
    const { email, password } = req.body

    const hashPassword = hashSync(password)

    const user = this._repository.create({ email, password: hashPassword, token: 'kek' })
    const result = await this._repository.save(user)

    res.json(result)
  }

  public async login (req: RequestBody<IAuthRequest>, res: Response): Promise<void> {
    const { email, password } = req.body

    const user = await this._repository.findOneBy({ email })

    if (user) {
      const isValidPassword = compareSync(password, user.password)

      if (isValidPassword) {
        const accessToken = this._generateAccessToken(user)
        const refreshToken = this._generateRefreshToken(user)

        res.json({ accessToken, refreshToken })
      } else {
        res.status(StatusCode.BAD_REQUEST).json({ message: 'Пароли не совпадают' })
      }
    } else {
      res.status(StatusCode.NOTFOUND).json({ message: 'Такого пользователя не сущевствует' })
    }
  }

  private _generateAccessToken (user: User): string {
    return sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1200 }) as string
  }

  private _generateRefreshToken (user: User): string {
    return sign({ ...user }, process.env.REFRESH_TOKEN_SECRET) as string
  }

}

export { AuthController }
