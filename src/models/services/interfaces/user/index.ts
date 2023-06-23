interface IRegisterPayload {
  email: string
  password: string
}

interface IUserService {
  registration(payload: IRegisterPayload): Promise<unknown>
}

export type { IUserService, IRegisterPayload }
