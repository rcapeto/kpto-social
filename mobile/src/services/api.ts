import axios from 'axios'

import { http } from '@http/index'
import { useTheme } from '~/hooks/useTheme'
import { appConfig } from '~/config/app'
import { HTTPErrorEnum } from '@http/enums/errors'
import { httpMessages } from '@http/constants/messages'

const { isAndroid } = useTheme()

const api = axios.create({
  baseURL: appConfig.baseUrl[isAndroid ? 'android' : 'iOS'](
    appConfig.serverPort,
  ),
  validateStatus: () => true,
})

api.interceptors.response.use((response) => {
  const isError = Boolean(response?.data?.error)
  const isUnauthorized = Boolean(
    response?.data?.cause === HTTPErrorEnum.UNAUTHORIZED,
  )

  if (isError && isUnauthorized) {
    const message = httpMessages.errors.unauthorized
    throw new Error(message)
  }
  return response
})

export function manipulateHeaderAPI(key: string, value: string) {
  api.defaults.headers[key] = value
}

export default api
