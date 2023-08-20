import { RowDataPacket } from 'mysql2'
import pool from '../database'

const getAllBooks = async () => {
  const sql = `
    SELECT
      BookID AS bookId,
      Title AS title,
      Chapters AS chapters,
      Pages AS pages,
      CreatedAt AS createdAt,
      UpdatedAt AS updatedAt
    FROM book
  `
  const [rows] = await pool.query<RowDataPacket[]>(sql)

  return rows
}

const createBook = async (title: string, chapters: number, pages: number) => {
  const sql = 'INSERT INTO book (Title, Chapters, Pages) VALUES (?, ?, ?)'
  const values = [title, chapters, pages]

  const result = await pool.query(sql, values)

  if ('insertId' in result) {
    return result.insertId
  }

  return null
}

// const createBookAuthor = (bookId: number, authorId: number) => {}

export default {
  getAllBooks,
  createBook,
  // createBookAuthor,
}
