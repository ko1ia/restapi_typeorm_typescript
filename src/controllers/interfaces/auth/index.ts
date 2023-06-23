import type { IRegisterResponse } from '../../../models/services/interfaces/user'

interface IAuthRequest {
  email: string
  password: string
}

type IAuthResponse = IRegisterResponse

export type {
  IAuthRequest,
  IAuthResponse
}
