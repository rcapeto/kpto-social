import { HTTPConfig } from '@http/types/http'
import {
  FindOneParams,
  FindOneResponse,
  findOneParams,
} from '~/lib/http/routes/developers/types'

import api from '~/services/api'
import { apiURLs } from '@http/config/api-urls'
import { responseMapper, errorMapper } from '@http/utils/mapper'

const path = apiURLs.developers

export async function findOne(params: FindOneParams, config?: HTTPConfig) {
  try {
    config?.dispatchLoading?.()

    const { developerId } = findOneParams.parse(params)

    const { data, status } = await api.get<FindOneResponse>(
      path.findOne(developerId),
    )

    return responseMapper(data, status)
  } catch (err) {
    const endpoint = path.findOne(params.developerId ?? '')

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
