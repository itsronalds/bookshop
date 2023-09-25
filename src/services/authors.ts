import { RowDataPacket, ResultSetHeader } from 'mysql2'
import pool from '../database'
import { Author } from '../types'

const getAllAuthors = async () => {
  const sql = `
    SELECT
      AuthorID AS authorId,
      Name AS name,
      CreatedAt AS createdAt,
      UpdatedAt AS updatedAt
    FROM author
  `
  const [rows] = await pool.query<RowDataPacket[]>(sql)

  return rows
}

const getAuthorById = async (authorId: number) => {
  const sql = 'SELECT AuthorID AS authorId, Name AS name FROM author WHERE AuthorID = ?'

  const [rows] = await pool.query<RowDataPacket[]>(sql, authorId)
  const author = rows[0] as Author | undefined

  return author ? author : null
}

const createAuthor = async (name: string) => {
  const sql = 'INSERT author (Name) VALUES (?)'
  const values = [name]

  const [result] = await pool.query<ResultSetHeader>(sql, values)

  if (result.affectedRows > 0) {
    return result.insertId
  }

  return null
}

const isAuthorExistByName = async (name: string) => {
  const sql = 'SELECT AuthorID FROM author WHERE LOWER(Name) = ?'
  const values = [name]

  const [rows] = await pool.query<RowDataPacket[]>(sql, values)

  if (rows.length > 0) {
    return true
  }

  return false
}

export default {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  isAuthorExistByName,
}
