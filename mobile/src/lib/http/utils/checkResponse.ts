import { ApiResponse } from '@http/types/http'
import { Status } from '@http/enums/status'

function isErrorAPI(response: ApiResponse) {
  const isError = Boolean(response?.data?.error)
  const errorMessage = response?.data?.message ?? ''

  return { isError, errorMessage }
}

function checkStatus(status: number) {
  const isErrorStatus = statusErrors.includes(status)
  return { isErrorStatus }
}

const statusErrors = [
  Status.NOT_FOUND,
  Status.BAD_REQUEST,
  Status.INTERNAL_SERVER_ERROR,
  Status.UNAUTHORIZED,
]

export function checkResponseAPI(response: ApiResponse, status: number) {
  const statusResponse = checkStatus(status)
  const errorData = isErrorAPI(response)
  return Object.assign(errorData, statusResponse)
}
