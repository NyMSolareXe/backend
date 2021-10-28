import { Request, Response } from 'express'
import { checkIfErrors, createResponse, invalidID } from '../helper_functions/helper'
import CustomersModel, { CreateCustomerObject, UpdateCustomerObject, CustomersID } from '../model/CustomerModel'
import CustomerOrganizationModel from '../model/CustomerOrganizationModel'

export const createCustomers = async (req: Request, res: Response) => {
  const data: CreateCustomerObject = req.body
  const { name, location } = data

  const validatedBoolean = checkIfErrors(res, [
    { inputValue: name, field_name: 'name', whatIsType: 'string', minLength: 4, maxLength: 15 },
    { inputValue: location, field_name: 'location', whatIsType: 'string', minLength: 4, maxLength: 15 }
  ])
  if (!validatedBoolean) {
    return
  }

  CustomersModel.insert({ name, location })

  const message = 'Customer Has Been Created Successfully'

  createResponse(res, 201, message)
}

export const deleteCustomers = async (req: Request, res: Response) => {
  const data: CustomersID = req.body
  const { id } = data

  const validatedBoolean = checkIfErrors(res, [{ inputValue: id, field_name: 'id', whatIsType: 'number', minLength: 0, maxLength: 300 }])
  if (!validatedBoolean) {
    return
  }
  const existsArray = await CustomersModel.checkIfExists({ id })
  if (existsArray.length === 0) {
    return invalidID(res, {id})
  }

  await CustomerOrganizationModel.deleteCustomerFromOrganization({ customer_id: id})
  await CustomersModel.delete({ id })

  const message = 'Customer Has Been Deleted Successfully'

  createResponse(res, 200, message)
}

export const editCustomers = async (req: Request, res: Response) => {
  const data: UpdateCustomerObject = req.body
  const { id, name, location } = data

  const validatedBoolean = checkIfErrors(res, [
    { inputValue: id, field_name: 'id', whatIsType: 'number', minLength: 0, maxLength: 9999 },
    { inputValue: name, field_name: 'name', whatIsType: 'string', minLength: 4, maxLength: 15 },
    { inputValue: location, field_name: 'location', whatIsType: 'string', minLength: 4, maxLength: 15 },
  ])
  if (!validatedBoolean) {
    return
  }
  const existsArray = await CustomersModel.checkIfExists({ id })
  if (existsArray.length === 0) {
    return invalidID(res, {id})
  }

  CustomersModel.update({ id, name, location })

  const message = 'Customer Has Been Updated Successfully'

  createResponse(res, 200, message)
}

export const getCustomers = async (req: Request, res: Response) => {
  const data: CustomersID = req.body
  const { id } = data
  const validatedBoolean = checkIfErrors(res, [{ inputValue: id, field_name: 'id', whatIsType: 'number', minLength: 0, maxLength: 300 }])
  if (!validatedBoolean) {
    return
  }
  const CustomersArray = await CustomersModel.getOne({ id })
  if (CustomersArray.length === 0) {
    return invalidID(res, {id})
  }
  const message = {
    user: CustomersArray[0],
  }
  createResponse(res, 200, message)
}

export const getAllCustomers = async (req: Request, res: Response) => {
  const CustomersArray = await CustomersModel.getAll()
  const message = {
    Customers: CustomersArray,
  }
  createResponse(res, 200, message)
}
