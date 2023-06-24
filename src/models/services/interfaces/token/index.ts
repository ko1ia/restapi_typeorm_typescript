import type { Token } from '../../../entity/Token'
import type { User } from '../../../entity/User'

interface ITokenResponse {
  accessToken: string
  refreshToken: string
}

abstract class ITokenService {

  public abstract generateTokens (payload: object): ITokenResponse
  public abstract saveToken (user: User, refreshToken: string): Promise<Token>

}

export type { ITokenService, ITokenResponse }
