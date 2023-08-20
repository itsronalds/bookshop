import { RowDataPacket } from 'mysql2'
import pool from '../database'
import { Author } from '../types'

const getAuthorById = async (authorId: number) => {
  const sql = 'SELECT AuthorID AS authorId, Name AS name FROM author WHERE AuthorID = ?'

  const [rows] = await pool.query<RowDataPacket[]>(sql, authorId)
  const author = rows[0] as Author | undefined

  return author ? author : null
}

export default {
  getAuthorById,
}
