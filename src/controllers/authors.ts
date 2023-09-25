import { Request, Response } from 'express'

import authorServices from '../services/authors'
import { successResponse, errorResponse, httpCodes, responseMessages } from '../utils/response'

const getAllAuthors = async (_req: Request, res: Response) => {
  try {
    const authors = await authorServices.getAllAuthors()
    res.status(httpCodes.HTTP_200_OK).json(successResponse(authors))
  } catch (error) {
    console.error(error)

    res.status(httpCodes.HTTP_500_INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error.'))
  }
}

const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    if (typeof name !== 'string') {
      return res.status(httpCodes.HTTP_400_BAD_REQUEST).json(errorResponse(responseMessages.error.INVALID_DATATYPE))
    }

    if (name === '') {
      return res.status(httpCodes.HTTP_400_BAD_REQUEST).json(errorResponse(responseMessages.error.EMPTY_NAME))
    }

    const isAuthorExistByName = await authorServices.isAuthorExistByName(name.toLowerCase())

    if (isAuthorExistByName === true) {
      return res.status(httpCodes.HTTP_202_ACCEPTED).json(errorResponse(responseMessages.error.AUTHOR_EXIST))
    }

    const result = await authorServices.createAuthor(name)

    if (result === null) {
      return res
        .status(httpCodes.HTTP_500_INTERNAL_SERVER_ERROR)
        .json(errorResponse(responseMessages.error.CREATE_AUTHOR))
    }

    return res
      .status(httpCodes.HTTP_200_OK)
      .json(successResponse({ authorId: result, message: responseMessages.success.CREATE_AUTHOR }))
  } catch (error) {
    console.error(error)

    return res.status(httpCodes.HTTP_500_INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error.'))
  }
}

export default {
  getAllAuthors,
  createAuthor,
}
