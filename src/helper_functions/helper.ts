import { Response } from 'express'
import fs from 'fs'

export interface validateDataInterface {
  inputValue: string | boolean | object | number
  field_name: string
  whatIsType: string
  minLength: number
  maxLength: number
}

export interface Validation extends validateDataInterface {
  error_validation_object: any
}

export const validateData = (data: Validation) => {
  const { error_validation_object, inputValue, field_name, whatIsType, minLength, maxLength } = data
  const errorsMessages: any = {}

  if (inputValue instanceof Array) {
    console.log('OK')
  }

  if (inputValue === undefined) {
    errorsMessages['required'] = `${field_name} field is required`
  }

  if (typeof inputValue !== whatIsType) {
    errorsMessages['type'] = `${field_name} field must be a ${whatIsType}`
  }

  if (typeof inputValue === 'string' && inputValue.length === 0) {
    errorsMessages['length'] = `${field_name} cannot be a empty string`
  }

  if (typeof inputValue === 'string' && (inputValue.length < minLength || inputValue.length > maxLength)) {
    errorsMessages['length'] = `${field_name} must be between ${minLength} and ${maxLength} characters`
  }

  if (typeof inputValue === 'number' && (inputValue < minLength || inputValue > maxLength)) {
    errorsMessages['length'] = `${field_name} must be between ${minLength} and ${maxLength}`
  }

  if (Object.keys(errorsMessages).length > 0) {
    error_validation_object[`${field_name}`] = errorsMessages
  }
}

export const getTime = () => {
  const current_time = new Date().toLocaleString('default', { dateStyle: 'medium', timeStyle: 'full' })
  console.log(`Received Request at: ${current_time}`)
  return current_time
}

export const makeDirectoryIfNotExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

export const makeFile = (dir: string, file_contents: string) => {
  fs.writeFileSync(dir, file_contents)
}

export const checkIfErrors = (res: Response, validationArray: validateDataInterface[]) => {
  const errorObject = validateResponse(validationArray)
  if (Object.keys(errorObject).length > 0) {
    createResponse(res, 400, errorObject)
    return false
  }
  return true
}

export const validateResponse = (array: validateDataInterface[]) => {
  const error_validation_object: any = {}
  for (const item of array) {
    const { inputValue, field_name, whatIsType, minLength, maxLength } = item
    validateData({ error_validation_object, inputValue, field_name, whatIsType: whatIsType, minLength, maxLength })
  }
  return error_validation_object
}

export const invalidID = (res: Response, field_name: any) => {
  const key = Object.keys(field_name)[0]
  const errorObject = {
    [Object.keys(field_name)[0]]: {
      invalid: `That ${key}: ${field_name[`${key}`]} does not exist`,
    },
  }
  createResponse(res, 400, errorObject)
  return false
}

export const createResponse = (res: Response, statusCode: number, message: {}) => {
  res.status(statusCode).json({
    data: message,
    time: getTime(),
  })
}

export const findItem = (item: Object, column_name: any) => {
  if (column_name instanceof Array) {
    let currentLocation: any = item
    for (const subcolumn of column_name) {
      currentLocation = findValueInObject(currentLocation, subcolumn)
    }
    return currentLocation
  }

  return findValueInObject(item, column_name)
}

export const findValueInObject = <T extends object, U extends keyof T>(item: T, column_name: U) => {
  return item[column_name]
}
