import { HTTPErrorCallback } from '@http/types/http'
import { checkResponseAPI } from '@http/utils/checkResponse'
import { getZodError } from '@http/utils/getZodError'

import {
  LoginParams,
  LoginResponse,
  loginParams,
  RegisterParams,
  RegisterResponse,
  registerParams,
} from '@http/routes/account/types'

import api from '~/services/api'
import { apiURLs } from '@http/config/api-urls'

const path = apiURLs.account

export async function login(
  params: LoginParams,
  errorCallback?: HTTPErrorCallback,
) {
  try {
    const query = loginParams.parse(params)
    const { data: response, status } = await api.post<LoginResponse>(
      path.login,
      query,
    )

    const { errorMessage, isError, isErrorStatus } = checkResponseAPI(
      response,
      status,
    )

    if (isError || isErrorStatus) {
      throw new Error(errorMessage)
    }

    console.log('here here', response)

    return response
  } catch (err) {
    const { message } = getZodError(err)
    errorCallback?.(message)
  }
}

export async function register(
  params: RegisterParams,
  errorCallback?: HTTPErrorCallback,
) {
  try {
    const query = registerParams.parse(params)
    const { data: response, status } = await api.post<RegisterResponse>(
      path.register,
      query,
    )

    const { errorMessage, isError, isErrorStatus } = checkResponseAPI(
      response,
      status,
    )

    if (isError || isErrorStatus) {
      throw new Error(errorMessage)
    }

    console.log('here here', response)

    return response
  } catch (err) {
    const { message } = getZodError(err)
    errorCallback?.(message)
  }
}
