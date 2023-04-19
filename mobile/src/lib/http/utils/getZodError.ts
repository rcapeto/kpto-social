import { ZodError } from 'zod'
import { httpMessages } from '@http/constants/messages'

interface GetZodErrorResponse {
  isZodError: boolean
  message: string
}

export function getZodError(
  error: any,
  defaultMessageError?: string,
): GetZodErrorResponse {
  const response: GetZodErrorResponse = {
    isZodError: false,
    message: defaultMessageError ?? 'Internal Server Error',
  }

  if (error instanceof ZodError) {
    response.isZodError = true
    response.message = error.issues.map((issue) => issue.message).join(', ')
  } else if (error instanceof Error) {
    response.message = error.message
  }

  return response
}
