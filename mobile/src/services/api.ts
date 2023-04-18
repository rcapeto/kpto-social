import axios from 'axios'

import { http } from '@http/index'
import { useTheme } from '~/hooks/useTheme'
import { appConfig } from '~/config/app'

const { isAndroid } = useTheme()

const api = axios.create({
  baseURL: appConfig.baseUrl[isAndroid ? 'android' : 'iOS'](
    appConfig.serverPort,
  ),
  validateStatus: false,
})

api.interceptors.response.use((response) => {
  http.security(response)
  return response
})

export function manipulateHeaderAPI(key: string, value: string) {
  api.defaults.headers[key] = value
}

export default api
