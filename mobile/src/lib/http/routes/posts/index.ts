import { HTTPConfig } from '@http/types/http'
import {
  FindManyPostsParams,
  findManyParams,
  FindManyPostsResponse,
} from '~/lib/http/routes/posts/types'

import api from '~/services/api'
import { apiURLs } from '@http/config/api-urls'
import { responseMapper, errorMapper } from '@http/utils/mapper'

const path = apiURLs.posts

export async function findMany(
  params: FindManyPostsParams,
  config?: HTTPConfig,
) {
  try {
    config?.dispatchLoading?.()

    const formattedParams = Object.assign(
      { search: '', perPage: 10, page: 1 },
      params,
    )
    const query = findManyParams.parse(formattedParams)

    const { data, status, headers } = await api.get<FindManyPostsResponse>(
      path.findMany,
      {
        params: query,
      },
    )

    const count = Number(headers['x-total-count']) ?? 0
    const response = responseMapper(data, status)

    return { ...response, count }
  } catch (err) {
    errorMapper(err, config?.errorCallback, config?.unauthorizedCallback)
  } finally {
    config?.dispatchLoading?.()
  }
}
