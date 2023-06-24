import { StatusCode } from './enum'

class ApiError extends Error {

  public status: StatusCode

  public errors: object[]

  constructor (status: StatusCode, message: string, errors: object[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  public static UnauthorizedError (): ApiError {
    return new ApiError(StatusCode.UNAUTHORIZED, 'Пользователь не авторизован')
  }

  public static BadRequest (message: string, errors: object[] = []): ApiError {
    return new ApiError(StatusCode.BAD_REQUEST, message, errors)
  }

}

export { ApiError }
