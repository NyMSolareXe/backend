import dotenv from 'dotenv'
import mysql from 'mysql'
dotenv.config().parsed

class myDatabase {
  static connection: mysql.Connection | undefined = undefined

  static openConnection = async () => {
    try {
      this.connection = await mysql.createConnection({
        host: process.env.LOCAL_DATABASE_HOST,
        user: process.env.LOCAL_PHPMYADMIN_USERNAME,
        password: process.env.LOCAL_PHPMYADMIN_PASSWORD,
        database: process.env.LOCAL_PHPMYADMIN_DATABASE_NAME,
        multipleStatements: true,
      })
    } catch (error) {
      // Handle + Log error
    }
  }

  static doQuery = async (sqlQuery: string) => {
    return await new Promise((resolve, reject) => {
      try {
        if (this.connection) {
          this.connection.query(sqlQuery, async (error, results, fields) => {
            if (error) {
              throw error
            }
            resolve(results)
          })
        }
      } catch (error) {
        // Handle + Log error
      }
    })
    // this.closeConnection()
    // return resulting
  }

  static closeConnection = async () => {
    try {
      if (this.connection) {
        this.connection.end()
      }
    } catch (error) {
      // Handle + Log error
    }
  }
}

export default myDatabase
