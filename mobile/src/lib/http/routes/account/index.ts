import { HTTPConfig } from '@http/types/http'
import {
  LoginParams,
  LoginResponse,
  MeParams,
  MeResponse,
  RegisterParams,
  RegisterResponse,
  loginParams,
  meParams,
  registerParams,
} from '@http/routes/account/types'

import api from '~/services/api'
import { apiURLs } from '@http/config/api-urls'
import { responseMapper, errorMapper } from '@http/utils/mapper'

const path = apiURLs.account

export async function login(params: LoginParams, config?: HTTPConfig) {
  const endpoint = path.login

  try {
    config?.dispatchLoading?.()

    const query = loginParams.parse(params)
    const { data, status } = await api.post<LoginResponse>(endpoint, query)

    return responseMapper(data, status)
  } catch (err) {
    errorMapper({
      endpoint,
      error: err,
      errorCallback: config?.errorCallback,
      unauthorizedCallback: config?.unauthorizedCallback,
    })
  } finally {
    config?.dispatchLoading?.()
  }
}

export async function me(params: MeParams, config?: HTTPConfig) {
  const endpoint = apiURLs.developers.me

  try {
    config?.dispatchLoading?.()

    const { token } = meParams.parse(params)
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    const { data, status } = await api.get<MeResponse>(endpoint, { headers })

    return responseMapper(data, status)
  } catch (err) {
    errorMapper({
      endpoint,
      error: err,
      errorCallback: config?.errorCallback,
      unauthorizedCallback: config?.unauthorizedCallback,
    })
  } finally {
    config?.dispatchLoading?.()
  }
}

export async function register(params: RegisterParams, config?: HTTPConfig) {
  const endpoint = path.register

  try {
    config?.dispatchLoading?.()

    const query = registerParams.parse(params)
    const { data, status } = await api.post(endpoint, query)

    responseMapper(data, status)

    return { status }
  } catch (err) {
    errorMapper({
      endpoint,
      error: err,
      errorCallback: config?.errorCallback,
      unauthorizedCallback: config?.unauthorizedCallback,
    })
  } finally {
    config?.dispatchLoading?.()
  }
}
