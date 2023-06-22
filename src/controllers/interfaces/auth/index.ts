interface IAuthRequest {
  email: string
  password: string
}

interface IAuthResponse {
  token: string
}

export type {
  IAuthRequest,
  IAuthResponse
}
