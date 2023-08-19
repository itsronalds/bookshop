import mysql from 'mysql'
import { promisify } from 'util'
import config from '../config'

const database = mysql.createPool({
  host: config.DATABASE_HOST,
  user: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
})

database.getConnection((err, connection) => {
  if (err) {
    throw err
  }

  if (connection) {
    connection.release()
  }
})

export default promisify(database.query).bind(database)
