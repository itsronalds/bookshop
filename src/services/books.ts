import { RowDataPacket, ResultSetHeader } from 'mysql2'
import pool from '../database'
import { BookDetails } from '../types'

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

const getBookDetails = async (bookId: number) => {
  const sql = `
    SELECT 
      Chapters AS chapters,
      Pages AS pages
    FROM book
    WHERE BookID = ?
  `
  const values = [bookId]

  const [rows] = await pool.query<RowDataPacket[]>(sql, values)
  const book = rows[0] as BookDetails | undefined

  return book
}

const createBook = async (title: string, chapters: number, pages: number) => {
  const sql = 'INSERT INTO book (Title, Chapters, Pages) VALUES (?, ?, ?)'
  const values = [title, chapters, pages]

  const [result] = await pool.query<ResultSetHeader>(sql, values)

  if (result.affectedRows > 0) {
    return result.insertId
  }

  return null
}

const createBookAuthor = async (data: number[][]) => {
  const sql = 'INSERT INTO book_author (BookID, AuthorID) VALUES ?'
  const values = [data]

  const [result] = await pool.query<ResultSetHeader>(sql, values)

  if (result.affectedRows > 0) {
    return true
  }

  return null
}

const isBookExistByTitle = async (title: string) => {
  const sql = 'SELECT BookID FROM book WHERE LOWER(Title) = ?'
  const values = [title]

  const [rows] = await pool.query<RowDataPacket[]>(sql, values)

  if (rows.length > 0) {
    return true
  }

  return null
}

export default {
  getAllBooks,
  getBookDetails,
  createBook,
  createBookAuthor,
  isBookExistByTitle,
}
