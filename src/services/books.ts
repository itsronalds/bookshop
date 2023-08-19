import query from '../database'

const getAllBooks = async () => {
  const books = await query('SELECT * FROM book')
  return books
}

export default {
  getAllBooks,
}
