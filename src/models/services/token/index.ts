import { sign } from 'jsonwebtoken'

import { DataBase } from '../../../data-access'
import { Token } from '../../entity/Token'

import type { User } from '../../entity/User'
import type { ITokenResponse, ITokenService } from '../interfaces/token'
import type { FindOptionsWhere } from 'typeorm'

const TokenModel = DataBase.getRepository(Token)

class TokenService implements ITokenService {

  public generateTokens (payload: object): ITokenResponse {
    const accessToken = sign(Object.assign(payload) as object, process.env.ACCESS_TOKEN ?? '', { expiresIn: 1200 })
    const refreshToken = sign(Object.assign(payload) as object, process.env.REFRESH_TOKEN ?? '')

    return {
      accessToken,
      refreshToken
    }
  }

  public async saveToken (user: User, refreshToken: string): Promise<Token> {
    const token = await TokenModel.findOneBy({ user: user as unknown as FindOptionsWhere<Token> })

    if (token) {
      token.token = refreshToken

      return token.save()
    }
    const newToken = TokenModel.create({ user: user, token: refreshToken })

    return newToken.save()
  }

}

export { TokenService }
