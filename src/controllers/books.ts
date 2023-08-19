import { Request, Response } from 'express'
import { BookType } from '../types'

import bookServices from '../services/books'
import response from '../utils/response'

const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = (await bookServices.getAllBooks()) as BookType[]
    res.status(response.responseCodes.HTTP_200_OK).json(response.successResponse(books))
  } catch (error) {
    console.error(error)

    res.status(response.responseCodes.HTTP_500_INTERNAL_ERROR).json(response.errorResponse('Internal server error.'))
  }
}

export default {
  getAllBooks,
}
