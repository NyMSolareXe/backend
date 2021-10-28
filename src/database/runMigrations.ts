import DB from './db'
import Users from '../migrations/create_users_table'
import Customers from '../migrations/create_customers_table'
import Organization from '../migrations/create_organization_table'
import Customer_Organization from '../migrations/create_customers_organization_table'

const allArray: any = [Users, Customers, Organization, Customer_Organization]

const execute = async () => {
  await DB.openConnection()
  await RunQuery('Drop')
  await RunQuery('Create')
  await RunQuery('Seed')
  await DB.closeConnection()
}

const RunQuery = async (method: any) => {
  for (const query of allArray) {
    console.log(`Executed: ${query[method]}`)
    await DB.doQuery(query[method])
  }
}

// const DropTables = async () => {
//   for (const query of allArray) {
//     console.log(`Executed: ${query.Drop}`)
//     await DB.doQuery(query.Drop)
//   }
// }

// const CreateTables = async () => {
//   for (const query of allArray) {
//     console.log(`Executed: ${query.Create}`)
//     await DB.doQuery(query.Create)
//   }
// }

// const SeedTables = async () => {
//   for (const query of allArray) {
//     console.log(`Executed: ${query.Seed}`)
//     await DB.doQuery(query.Seed)
//   }
// }

execute()
