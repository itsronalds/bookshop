import { Request, Response } from 'express'

import bookServices from '../services/books'
import authorServices from '../services/authors'
import { successResponse, errorResponse, httpCodes, responseMessages } from '../utils/response'
import { Book } from '../types'

const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await bookServices.getAllBooks()
    res.status(httpCodes.HTTP_200_OK).json(successResponse(books))
  } catch (error) {
    console.error(error)

    res.status(httpCodes.HTTP_500_INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error.'))
  }
}

const getBookDetails = async (req: Request, res: Response) => {
  try {
    const bookId = Number(req.params?.bookId) || undefined

    if (typeof bookId === 'undefined' || isNaN(Number(bookId))) {
      return res.status(httpCodes.HTTP_400_BAD_REQUEST).json(errorResponse(responseMessages.error.INVALID_ID))
    }

    const book = await bookServices.getBookDetails(bookId)

    if (book === undefined) {
      return res.status(httpCodes.HTTP_404_NOT_FOUND).json(errorResponse(responseMessages.error.BOOK_NOT_EXIST))
    }

    res.status(httpCodes.HTTP_200_OK).json(
      successResponse({
        bookId: String(bookId),
        pagesAveragePerChapters: (book.pages / book.chapters).toFixed(2),
      }),
    )
  } catch (error) {
    console.error(error)

    res.status(httpCodes.HTTP_500_INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error.'))
  }
}

const createBook = async (req: Request, res: Response) => {
  try {
    const { title, chapters, pages, authors }: Book = req.body

    if (title === '') {
      return res.status(httpCodes.HTTP_400_BAD_REQUEST).json(errorResponse(responseMessages.error.INVALID_TITLE))
    }

    if (isNaN(chapters)) {
      return res.status(httpCodes.HTTP_400_BAD_REQUEST).json(errorResponse(responseMessages.error.INVALID_CHAPTERS))
    }

    if (isNaN(pages)) {
      return res.status(httpCodes.HTTP_400_BAD_REQUEST).json(errorResponse(responseMessages.error.INVALID_PAGES))
    }

    if (Array.isArray(authors) === false) {
      return res.status(httpCodes.HTTP_400_BAD_REQUEST).json(errorResponse(responseMessages.error.INVALID_DATATYPE))
    }

    if (authors.length === 0) {
      return res.status(httpCodes.HTTP_400_BAD_REQUEST).json(errorResponse(responseMessages.error.EMPTY_AUTHOR_IDS))
    }

    const verifyAuthorIds = authors.every((id) => !isNaN(id))

    if (verifyAuthorIds === false) {
      return res.status(httpCodes.HTTP_400_BAD_REQUEST).json(errorResponse(responseMessages.error.INVALID_AUTHOR_IDS))
    }

    // Check each author id
    for (let i = 0; i < authors.length; i++) {
      const authorId = authors[i]
      const author = await authorServices.getAuthorById(authorId)

      if (author === null) {
        res.status(httpCodes.HTTP_400_BAD_REQUEST).json(errorResponse(responseMessages.error.AUTHOR_NOT_EXIST))
      }
    }

    // Check if book exist
    const isBookExistByName = await bookServices.isBookExistByTitle(title.toLowerCase())

    if (isBookExistByName === true) {
      return res.status(httpCodes.HTTP_202_ACCEPTED).json(errorResponse(responseMessages.error.BOOK_EXIST))
    }

    const bookId = await bookServices.createBook(title, chapters, pages)

    if (bookId === null) {
      return res
        .status(httpCodes.HTTP_500_INTERNAL_SERVER_ERROR)
        .json(errorResponse(responseMessages.error.CREATE_BOOK))
    }

    // Data to insert
    const data = authors.map((authorId) => [bookId, authorId])

    const result = await bookServices.createBookAuthor(data)

    if (result === null) {
      return res.status(httpCodes.HTTP_500_INTERNAL_SERVER_ERROR).json(responseMessages.error.CREATE_BOOK)
    }

    res.status(httpCodes.HTTP_200_OK).json(
      successResponse({
        bookId,
        message: responseMessages.success.CREATE_BOOK,
      }),
    )
  } catch (error) {
    console.error(error)

    res.status(httpCodes.HTTP_500_INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error.'))
  }
}

export default {
  getAllBooks,
  getBookDetails,
  createBook,
}
