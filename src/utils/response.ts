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

export const responseCodes = {
  HTTP_200_OK: 200,
  HTTP_401_UNAUTHORIZED: 401,
  HTTP_500_INTERNAL_ERROR: 500,
}

export default {
  successResponse,
  errorResponse,
  responseCodes,
}
