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

    const verifyAuthorIds = authors.every((id) => isNaN(id))

    if (verifyAuthorIds === false) {
      return res.status(httpCodes.HTTP_400_BAD_REQUEST).json(errorResponse(responseMessages.error.INVALID_AUTHOR_IDS))
    }

    // Verify each author id
    for (let i = 0; i < authors.length; i++) {
      const authorId = authors[i]
      const author = await authorServices.getAuthorById(authorId)

      if (author === null) {
        res.status(httpCodes.HTTP_400_BAD_REQUEST).json(errorResponse(responseMessages.error.AUTHOR_NOT_EXIST))
      }
    }

    res.json({ msg: 'Hello' })
  } catch (error) {
    console.error(error)

    res.status(httpCodes.HTTP_500_INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error.'))
  }
}

export default {
  getAllBooks,
  createBook,
}
