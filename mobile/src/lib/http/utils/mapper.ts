import {
  ApiResponse,
  HTTPErrorCallback,
  HTTPUnauthorizedCallback,
} from '@http/types/http'
import { checkResponseAPI } from '@http/utils/checkResponse'
import { getZodError } from '@http/utils/getZodError'
import { checkIsUnauthorized } from '@http/utils/checkIsUnauthorized'

export function responseMapper<Type>(
  response: ApiResponse<Type>,
  status: number,
) {
  const { errorMessage, isError, isErrorStatus } = checkResponseAPI(
    response,
    status,
  )

  if (isError || isErrorStatus) {
    throw new Error(errorMessage)
  }

  return response
}

export function errorMapper(
  error: any,
  errorCallback?: HTTPErrorCallback,
  unauthorizedCallback?: HTTPUnauthorizedCallback,
) {
  const { message } = getZodError(error)

  errorCallback?.(message)

  if (unauthorizedCallback) {
    checkIsUnauthorized(error, unauthorizedCallback)
  }
}
