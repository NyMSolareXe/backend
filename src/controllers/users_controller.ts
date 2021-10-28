import { Request, Response } from 'express'
import { checkIfErrors, createResponse, invalidID } from '../helper_functions/helper'
import UserModel, { CreateUserObject, UpdateUserObject, userID } from '../model/UserModel'

export const createUser = async (req: Request, res: Response) => {
  const data: CreateUserObject = req.body
  const { name, email, password } = data

  const validatedBoolean = checkIfErrors(res, [
    { inputValue: name, field_name: 'name', whatIsType: 'string', minLength: 4, maxLength: 15 },
    { inputValue: email, field_name: 'email', whatIsType: 'string', minLength: 4, maxLength: 40 },
    { inputValue: password, field_name: 'password', whatIsType: 'string', minLength: 4, maxLength: 15 },
  ])
  if (!validatedBoolean) {
    return
  }

  UserModel.insert({ name, email, password })

  const message = 'Account Has Been Created Successfully'

  createResponse(res, 201, message)
}

export const disableUser = async (req: Request, res: Response) => {
  const data: userID = req.body
  const { id } = data

  const validatedBoolean = checkIfErrors(res, [{ inputValue: id, field_name: 'id', whatIsType: 'number', minLength: 0, maxLength: 300 }])
  if (!validatedBoolean) {
    return
  }
  const existsArray = await UserModel.checkIfExists({ id })
  if (existsArray.length === 0) {
    return invalidID(res, {id})
  }

  UserModel.delete({ id })

  const message = 'Account Has Been Disabled Successfully'

  createResponse(res, 200, message)
}

export const enableUser = async (req: Request, res: Response) => {
  const data: userID = req.body
  const { id } = data

  const validatedBoolean = checkIfErrors(res, [{ inputValue: id, field_name: 'id', whatIsType: 'number', minLength: 0, maxLength: 300 }])
  if (!validatedBoolean) {
    return
  }
  const existsArray = await UserModel.checkIfExists({ id })
  if (existsArray.length === 0) {
    return invalidID(res, {id})
  }

  UserModel.enable({ id })

  const message = 'Account Has Been Enabled Successfully'

  createResponse(res, 200, message)
}

export const editUser = async (req: Request, res: Response) => {
  const data: UpdateUserObject = req.body
  const { id, name, email, password, active } = data

  const validatedBoolean = checkIfErrors(res, [
    { inputValue: id, field_name: 'id', whatIsType: 'number', minLength: 0, maxLength: 300 },
    { inputValue: name, field_name: 'name', whatIsType: 'string', minLength: 4, maxLength: 15 },
    { inputValue: email, field_name: 'email', whatIsType: 'string', minLength: 4, maxLength: 40 },
    { inputValue: password, field_name: 'password', whatIsType: 'string', minLength: 4, maxLength: 15 },
    { inputValue: active, field_name: 'active', whatIsType: 'number', minLength: 0, maxLength: 1 },
  ])
  if (!validatedBoolean) {
    return
  }
  const existsArray = await UserModel.checkIfExists({ id })
  if (existsArray.length === 0) {
    return invalidID(res, {id})
  }

  UserModel.update({ id, name, email, password, active })

  const message = 'Account Has Been Updated Successfully'

  createResponse(res, 200, message)
}


export const getUser = async (req: Request, res: Response) => {
  const data: userID = req.body
  const { id } = data
  const validatedBoolean = checkIfErrors(res, [{ inputValue: id, field_name: 'id', whatIsType: 'number', minLength: 0, maxLength: 300 }])
  if (!validatedBoolean) {
    return
  }
  const userArray = await UserModel.getOne({ id })
  if (userArray.length === 0) {
    return invalidID(res, {id})
  }
  const message = {
    user: userArray[0]
  }
  createResponse(res, 200, message)
}

export const getAllUser = async (req: Request, res: Response) => {
  const userArray = await UserModel.getAll()
  const message = {
    user: userArray
  }
  createResponse(res, 200, message)
}