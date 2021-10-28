import ErrorResponse from '../utils/errorResponse'
import { getTime } from '../helper_functions/helper'

import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

// export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
export const errorHandler: ErrorRequestHandler = (requestError, req, res, next) => {
  let customError = { ...requestError }
  customError.message = requestError.message

  if (requestError.name === 'SyntaxError') {
    const message = `Please enter a valid json object`
    customError = new ErrorResponse(message, 400, requestError)
  }

  res.status(customError.statusCode || 500).json({
    success: false,
    error_message: customError.message || 'Server Error',
    error_code: requestError.message,
    validation: customError.errorObject,
    time: getTime(),
  })
}
