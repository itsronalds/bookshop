import mysql from 'mysql2'
import config from '../config'

const connection = mysql.createPool({
  host: config.DATABASE_HOST,
  user: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
})

export default connection.promise()
