import {
  ApiResponse,
  HTTPErrorCallback,
  HTTPUnauthorizedCallback,
} from '@http/types/http'
import { checkResponseAPI } from '@http/utils/checkResponse'
import { getZodError } from '@http/utils/getZodError'
import { checkIsUnauthorized } from '@http/utils/checkIsUnauthorized'
import { EventManager } from '@events/event-manager'
import { EventsErrorEnum } from '@events/enums/errors'
import { EventType } from '@events/types'
import { createEventName } from '@events/utils/createEventName'

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
  const eventManager = EventManager.getInstance()
  const { message } = getZodError(error)

  errorCallback?.(message)

  eventManager.emmit(EventsErrorEnum.REQUEST, {
    eventName: createEventName('Request error'),
    eventScreenId: 'eventLib',
    eventType: EventType.APP,
    eventValue: { message },
  })

  if (unauthorizedCallback) {
    checkIsUnauthorized(error, unauthorizedCallback)
  }
}
