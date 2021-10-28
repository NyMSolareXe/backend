import DB from './db'
import Users from '../migrations/create_users_table'
import Customers from '../migrations/create_customers_table'
import Organization from '../migrations/create_organization_table'
import Customer_Organization from '../migrations/create_customers_organization_table'

const allArray: any = [Users, Customers, Organization, Customer_Organization]

export default async () => {
  await RunQuery('Drop')
  await RunQuery('Create')
  await RunQuery('Seed')
  return new Promise((res, rej) => res('Success'))
}

const RunQuery = async (method: any) => {
  for (const query of allArray) {
    await DB.doQuery(query[method])
  }
}