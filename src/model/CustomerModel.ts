import db from '../database/db'

export interface CustomersID {
  id: number
}

export interface CreateCustomerObject {
  name: string
  location: string
}

export interface UpdateCustomerObject extends CreateCustomerObject, CustomersID {}

class CustomerModel {
  public static insert = async ({ name, location }: CreateCustomerObject) => {
    const query = `INSERT INTO customer VALUES (DEFAULT, "${name}", "${location}");`
    await db.doQuery(query)
  }

  public static update = async ({ id, location, name }: UpdateCustomerObject) => {
    const query = `UPDATE customer SET name = "${name}", location = "${location}" WHERE id = ${id};`
    await db.doQuery(query)
  }

  public static getOne = async ({ id }: CustomersID) => {
    const query = `SELECT * FROM customer WHERE id = ${id}`
    return (await db.doQuery(query)) as Array<any>
  }

  public static getAll = async () => {
    const query = `SELECT * FROM customer`
    return (await db.doQuery(query)) as Array<any>
  }

  public static checkIfExists = async ({ id }: CustomersID) => {
    const query = `SELECT id FROM customer WHERE id = ${id};`
    return (await db.doQuery(query)) as Array<any>
  }

  public static delete = async ({ id }: CustomersID) => {
    const query = `DELETE FROM customer WHERE id = ${id};`
    await db.doQuery(query)
  }
}

export default CustomerModel
