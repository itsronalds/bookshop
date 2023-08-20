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
  HTTP_400_BAD_REQUEST: 400,
  HTTP_401_UNAUTHORIZED: 401,
  HTTP_500_INTERNAL_SERVER_ERROR: 500,
}

export const responseMessages = {
  success: {},
  error: {
    INVALID_DATATYPE: 'Invalid datatype',

    INVALID_TITLE: 'Invalid title',
    INVALID_CHAPTERS: 'Invalid chapters',
    INVALID_PAGES: 'Invalid pages',

    EMPTY_AUTHOR_IDS: 'Author ids is required',
    INVALID_AUTHOR_IDS: 'Invalid author ids',

    AUTHOR_NOT_EXIST: 'Author does not exist',
  },
}
