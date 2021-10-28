import db from '../database/db'

export interface userID {
  id: number
}

export interface CreateUserObject {
  name: string
  email: string
  password: string
}

export interface UpdateUserObject extends CreateUserObject, userID {
  active: number
}

class UserModel {
  public static insert = async ({ name, email, password }: CreateUserObject) => {
    const query = `INSERT INTO users VALUES (DEFAULT, "${name}", "${email}", "${password}", "1");`
    await db.doQuery(query)
  }

  public static update = async ({ id, name, email, password, active }: UpdateUserObject) => {
    const query = `UPDATE users SET name = "${name}", email = "${email}", password = "${password}", active = ${active} WHERE id = ${id};`
    await db.doQuery(query)
  }

  public static getOne = async ({ id }: userID) => {
    const query = `SELECT * FROM users WHERE id = ${id}`
    return await db.doQuery(query) as Array<any>
  }

  public static getAll = async () => {
    const query = `SELECT * FROM users`
    return await db.doQuery(query) as Array<any>
  }

  public static checkIfExists = async ({ id }: userID) => {
    const query = `SELECT id FROM users WHERE id = ${id};`
    return (await db.doQuery(query)) as Array<any>
  }

  public static delete = async ({ id }: userID) => {
    const query = `UPDATE users SET Active = 0 WHERE id = ${id};`
    await db.doQuery(query)
  }

  public static enable = async ({ id }: userID) => {
    const query = `UPDATE users SET Active = 1 WHERE id = ${id};`
    await db.doQuery(query)
  }
}

export default UserModel
