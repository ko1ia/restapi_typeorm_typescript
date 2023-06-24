import { ApiError } from '../../utils'

import type { NextFunction, Request, Response } from 'express'

const ErrorMiddleware = (err: ApiError | object[], req: Request, res: Response, next: NextFunction): Response => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' })
}

export { ErrorMiddleware }
