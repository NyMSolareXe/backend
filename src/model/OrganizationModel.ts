import db from '../database/db'

export interface organizationID {
  id: number
}

export interface CreateOrganizationObject {
  name: string
  address: string
  phone: string
}

export interface UpdateOrganizationObject extends CreateOrganizationObject, organizationID {}

class OrganizationModel {
  public static insert = async ({ name, address, phone }: CreateOrganizationObject) => {
    const query = `INSERT INTO organization VALUES (DEFAULT, "${name}", "${address}", "${phone}");`
    await db.doQuery(query)
  }

  public static update = async ({ id, name, address, phone }: UpdateOrganizationObject) => {
    const query = `UPDATE organization SET name = "${name}", address = "${address}", phone = "${phone}" WHERE id = ${id};`
    await db.doQuery(query)
  }

  public static getOne = async ({ id }: organizationID) => {
    const query = `SELECT * FROM organization WHERE id = ${id}`
    return (await db.doQuery(query)) as Array<any>
  }

  public static getAll = async () => {
    const query = `SELECT * FROM organization`
    return (await db.doQuery(query)) as Array<any>
  }

  public static checkIfExists = async ({ id }: organizationID) => {
    const query = `SELECT id FROM organization WHERE id = ${id};`
    return (await db.doQuery(query)) as Array<any>
  }

  public static delete = async ({ id }: organizationID) => {
    const query = `DELETE FROM organization WHERE id = ${id};`
    await db.doQuery(query)
  }
}

export default OrganizationModel
