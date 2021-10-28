class ErrorResponse extends Error {
  statusCode
  errorObject

  constructor(message: any, statusCode: any, errorObject: any) {
    super(message)
    this.statusCode = statusCode
    // if (errorObject) {
    this.errorObject = errorObject
    // }
  }
}

export default ErrorResponse