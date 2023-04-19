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

import api, { manipulateHeaderAPI } from '~/services/api'
import { apiURLs } from '@http/config/api-urls'
import { responseMapper, errorMapper } from '@http/utils/mapper'

const path = apiURLs.account
const mePath = apiURLs.developers.me

export async function login(params: LoginParams, config?: HTTPConfig) {
  try {
    config?.dispatchLoading?.()

    const query = loginParams.parse(params)
    const { data, status } = await api.post<LoginResponse>(path.login, query)

    return responseMapper(data, status)
  } catch (err) {
    errorMapper(err, config?.errorCallback, config?.unauthorizedCallback)
  } finally {
    config?.dispatchLoading?.()
  }
}

export async function me(params: MeParams, config?: HTTPConfig) {
  try {
    config?.dispatchLoading?.()

    const { token } = meParams.parse(params)
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    const { data, status } = await api.get<MeResponse>(mePath, { headers })

    return responseMapper(data, status)
  } catch (err) {
    errorMapper(err, config?.errorCallback, config?.unauthorizedCallback)
  } finally {
    config?.dispatchLoading?.()
  }
}

export async function register(params: RegisterParams, config?: HTTPConfig) {
  try {
    config?.dispatchLoading?.()

    const query = registerParams.parse(params)
    const { data, status } = await api.post(path.register, query)

    responseMapper(data, status)

    return { status }
  } catch (err) {
    errorMapper(err, config?.errorCallback, config?.unauthorizedCallback)
  } finally {
    config?.dispatchLoading?.()
  }
}
