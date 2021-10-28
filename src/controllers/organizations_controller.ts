import { Request, Response } from 'express'
import { checkIfErrors, createResponse, invalidID } from '../helper_functions/helper'
import CustomerOrganizationModel from '../model/CustomerOrganizationModel'
import OrganizationModel, { CreateOrganizationObject, UpdateOrganizationObject, organizationID } from '../model/OrganizationModel'

export const createOrganization = async (req: Request, res: Response) => {
  const data: CreateOrganizationObject = req.body
  const { name, address, phone } = data

  const validatedBoolean = checkIfErrors(res, [
    { inputValue: name, field_name: 'name', whatIsType: 'string', minLength: 4, maxLength: 15 },
    { inputValue: address, field_name: 'address', whatIsType: 'string', minLength: 5, maxLength: 30 },
    { inputValue: phone, field_name: 'phone', whatIsType: 'string', minLength: 10, maxLength: 15 },
  ])
  if (!validatedBoolean) {
    return
  }

  OrganizationModel.insert({ name, address, phone })

  const message = 'Organization Has Been Created Successfully'

  createResponse(res, 201, message)
}

export const deleteOrganization = async (req: Request, res: Response) => {
  const data: organizationID = req.body
  const { id } = data

  const validatedBoolean = checkIfErrors(res, [{ inputValue: id, field_name: 'id', whatIsType: 'number', minLength: 0, maxLength: 300 }])
  if (!validatedBoolean) {
    return
  }
  const existsArray = await OrganizationModel.checkIfExists({ id })
  if (existsArray.length === 0) {
    return invalidID(res, { id })
  }

  OrganizationModel.delete({ id })
  CustomerOrganizationModel.deleteOrganization({ organization_id: id })

  const message = 'Organization Has Been Deleted Successfully'

  createResponse(res, 200, message)
}

export const editOrganization = async (req: Request, res: Response) => {
  const data: UpdateOrganizationObject = req.body
  const { id, name, address, phone } = data

  const validatedBoolean = checkIfErrors(res, [
    { inputValue: id, field_name: 'id', whatIsType: 'number', minLength: 0, maxLength: 300 },
    { inputValue: name, field_name: 'name', whatIsType: 'string', minLength: 4, maxLength: 15 },
    { inputValue: address, field_name: 'address', whatIsType: 'string', minLength: 5, maxLength: 30 },
    { inputValue: phone, field_name: 'phone', whatIsType: 'string', minLength: 10, maxLength: 15 },
  ])
  if (!validatedBoolean) {
    return
  }
  const existsArray = await OrganizationModel.checkIfExists({ id })
  if (existsArray.length === 0) {
    return invalidID(res, { id })
  }

  OrganizationModel.update({ id, name, address, phone })

  const message = 'Organization Has Been Updated Successfully'

  createResponse(res, 200, message)
}

export const getOrganization = async (req: Request, res: Response) => {
  const data: organizationID = req.body
  const { id } = data
  const validatedBoolean = checkIfErrors(res, [{ inputValue: id, field_name: 'id', whatIsType: 'number', minLength: 0, maxLength: 300 }])
  if (!validatedBoolean) {
    return
  }
  const organizationArray = await OrganizationModel.getOne({ id })
  if (organizationArray.length === 0) {
    return invalidID(res, { id })
  }
  const message = {
    user: organizationArray[0],
  }
  createResponse(res, 200, message)
}

export const getAllOrganization = async (req: Request, res: Response) => {
  const organizationArray = await OrganizationModel.getAll()
  const message = {
    organization: organizationArray,
  }
  createResponse(res, 200, message)
}
