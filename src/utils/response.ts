export const successResponse = (data: object) => {
  return {
    success: true,
    data,
  }
}

export const errorResponse = (message: string) => {
  return {
    success: false,
    error: {
      message,
    },
  }
}

export const httpCodes = {
  HTTP_200_OK: 200,
  HTTP_202_ACCEPTED: 200,
  HTTP_400_BAD_REQUEST: 400,
  HTTP_401_UNAUTHORIZED: 401,
  HTTP_404_NOT_FOUND: 401,
  HTTP_500_INTERNAL_SERVER_ERROR: 500,
}

export const responseMessages = {
  success: {
    CREATE_BOOK: 'Successfully created book',
    CREATE_AUTHOR: 'Successfully created author',
  },
  error: {
    INVALID_DATATYPE: 'Invalid datatype',

    INVALID_ID: 'Invalid id',
    INVALID_TITLE: 'Invalid title',
    INVALID_CHAPTERS: 'Invalid chapters',
    INVALID_PAGES: 'Invalid pages',

    EMPTY_NAME: 'Name is required',
    EMPTY_AUTHOR_IDS: 'Author ids is required',
    INVALID_AUTHOR_IDS: 'Invalid author ids',

    AUTHOR_NOT_EXIST: 'Author does not exist',

    CREATE_BOOK: 'Error when creating a book',
    BOOK_EXIST: 'Book is exist',
    BOOK_NOT_EXIST: 'Book is not exist',

    CREATE_AUTHOR: 'Error when creating an author',
    AUTHOR_EXIST: 'Author is exist',
  },
}
