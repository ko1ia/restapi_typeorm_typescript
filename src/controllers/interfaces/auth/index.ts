interface IAuthRequest {
  email: string
  password: string
}

type IAuthResponse = unknown

export type {
  IAuthRequest,
  IAuthResponse
}
