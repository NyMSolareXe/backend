import { Request, Response } from 'express'
import { checkIfErrors, createResponse, invalidID } from '../helper_functions/helper'
import CustomerOrganizationModel, { CustomerOrganizationObject, CustomerID, OrganizationID } from '../model/CustomerOrganizationModel'
import CustomersModel from '../model/CustomerModel'
import OrganizationModel from '../model/OrganizationModel'

export const addCustomerToOrganization = async (req: Request, res: Response) => {
  const data: CustomerOrganizationObject = req.body
  const { customer_id, organization_id } = data

  const validatedBoolean = checkIfErrors(res, [
    { inputValue: customer_id, field_name: 'customer_id', whatIsType: 'number', minLength: 1, maxLength: 9999 },
    { inputValue: organization_id, field_name: 'organization_id', whatIsType: 'number', minLength: 1, maxLength: 9999 },
  ])
  if (!validatedBoolean) {
    return
  }
  const existsArrayCustomer = await CustomersModel.checkIfExists({ id: customer_id })
  if (existsArrayCustomer.length === 0) {
    return invalidID(res, { customer_id })
  }
  const existsArrayOrganization = await OrganizationModel.checkIfExists({ id: organization_id })
  if (existsArrayOrganization.length === 0) {
    return invalidID(res, { organization_id })
  }
  const CustomerAlreadyBelongs = await CustomerOrganizationModel.getCustomerOrganization({ customer_id })
  if (CustomerAlreadyBelongs.length !== 0) {
    return createResponse(res, 400, {
      customer_id: {
        message: 'This customer_id already belongs to a Organization',
      },
    })
  }

  CustomerOrganizationModel.insert({ customer_id, organization_id })

  const message = 'Customer Has Been Assigned To Organization Successfully'
  createResponse(res, 201, message)
}

export const deleteCustomerFromOrganization = async (req: Request, res: Response) => {
  const data: CustomerID = req.body
  const { customer_id } = data

  const validatedBoolean = checkIfErrors(res, [
    { inputValue: customer_id, field_name: 'customer_id', whatIsType: 'number', minLength: 1, maxLength: 9999 },
    // { inputValue: organization_id, field_name: 'organization_id', whatIsType: 'number', minLength: 1, maxLength: 9999 },
  ])
  if (!validatedBoolean) {
    return
  }
  const existsArrayCustomer = await CustomersModel.checkIfExists({ id: customer_id })
  if (existsArrayCustomer.length === 0) {
    return invalidID(res, { customer_id })
  }
  const existsArrayCustomerOrganization = await CustomerOrganizationModel.getCustomerOrganization({ customer_id })
  if (existsArrayCustomerOrganization.length === 0) {
    return createResponse(res, 400, {
      customer_id: {
        message: 'This customer_id does not belong to any organization',
      },
    })
  }

  // const existsArrayOrganization = await OrganizationModel.checkIfExists({ id: organization_id })
  // if (existsArrayOrganization.length === 0) {
  //   return invalidID(res, { organization_id })
  // }
  // const CustomerAlreadyBelongs = await CustomerOrganizationModel.matchCustomerOrganization({ customer_id, organization_id })
  // if (CustomerAlreadyBelongs.length === 0) {
  //   return createResponse(res, 400, {
  //     customer_id: {
  //       message: 'This customer_id does not belong to this organization',
  //     },
  //   })
  // }

  CustomerOrganizationModel.deleteCustomerFromOrganization({ customer_id })

  const message = 'Customer Has Been Removed From The Organization'

  createResponse(res, 200, message)
}

export const getAllCustomerForOrganization = async (req: Request, res: Response) => {
  const data: OrganizationID = req.body
  const { organization_id } = data
  const validatedBoolean = checkIfErrors(res, [
    { inputValue: organization_id, field_name: 'organization_id', whatIsType: 'number', minLength: 1, maxLength: 9999 },
  ])
  if (!validatedBoolean) {
    return
  }
  const existsArrayOrganization = await OrganizationModel.checkIfExists({ id: organization_id })
  if (existsArrayOrganization.length === 0) {
    return invalidID(res, { organization_id })
  }

  const customers = await CustomerOrganizationModel.getAllCustomersFromOrganization({ organization_id })

  const message = {
    customers: customers,
  }

  createResponse(res, 200, message)
}

export const getAllCustomersWithOrganization = async (req: Request, res: Response) => {
  const customersArray = await CustomerOrganizationModel.getAllCustomersWithOrganization()
  const message = {
    customers: customersArray,
  }
  createResponse(res, 200, message)
}
