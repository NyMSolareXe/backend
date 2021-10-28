import db from '../database/db'

export interface CustomerID {
  customer_id: number
}
export interface OrganizationID {
  organization_id: number
}

export interface CustomerOrganizationObject extends CustomerID, OrganizationID {}

class CustomerOrganizationModel {
  public static insert = async ({ customer_id, organization_id }: CustomerOrganizationObject) => {
    const query = `INSERT INTO customer_organization VALUES (${customer_id}, ${organization_id});`
    await db.doQuery(query)
  }

  public static getCustomerOrganization = async ({ customer_id }: CustomerID) => {
    const query = `SELECT organization_id FROM customer_organization WHERE customer_id = ${customer_id}`
    return (await db.doQuery(query)) as Array<any>
  }

  public static checkIfOrganizationExists = async ({ organization_id }: OrganizationID) => {
    const query = `SELECT id FROM customer_organization WHERE organization_id = ${organization_id};`
    return (await db.doQuery(query)) as Array<any>
  }

  public static deleteOrganization = async ({ organization_id }: OrganizationID) => {
    const query = `DELETE FROM customer_organization WHERE organization_id = ${organization_id};`
    await db.doQuery(query)
  }

  public static matchCustomerOrganization = async ({ customer_id, organization_id }: CustomerOrganizationObject) => {
    const query = `SELECT organization_id FROM customer_organization WHERE customer_id = ${customer_id} AND organization_id = ${organization_id}`
    return (await db.doQuery(query)) as Array<any>
  }

  public static deleteCustomerFromOrganization = async ({ customer_id}: CustomerID) => {
    const query = `DELETE FROM customer_organization WHERE customer_id = ${customer_id};`
    await db.doQuery(query)
  }

  public static getAllCustomersFromOrganization = async ({ organization_id }: OrganizationID) => {
    const query = `
      SELECT 
        C.* 
      FROM customer_organization CO
      INNER JOIN customer C
        ON C.id = CO.customer_id
      WHERE CO.organization_id = ${organization_id}
      ;
    `
    return (await db.doQuery(query)) as Array<any>
  }

  public static getAllCustomersWithOrganization = async () => {
    const query = `
      SELECT 
        C.id as customer_id,
        C.name as customer_Name,
        C.location as customer_Location,
        CO.organization_id as organization_id,
        O.name as organization_Name
      FROM customer C
      LEFT JOIN customer_organization CO
        ON C.id = CO.customer_id
      LEFT JOIN organization O
        ON O.id = CO.organization_id
      ;
    `
    return (await db.doQuery(query)) as Array<any>
  }

}

export default CustomerOrganizationModel
