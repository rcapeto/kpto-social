import { HTTPConfig } from '@http/types/http'
import {
  findManyParams,
  FindManyParams,
  FindManyResponse,
  findOneParams,
  FindOneParams,
  FindOneResponse,
  createPostParams,
  CreatePostParams,
  CreatePostResponse,
} from '~/lib/http/routes/posts/types'

import api from '~/services/api'
import { apiURLs } from '@http/config/api-urls'
import { responseMapper, errorMapper } from '@http/utils/mapper'

const path = apiURLs.posts

export async function findMany(params: FindManyParams, config?: HTTPConfig) {
  try {
    config?.dispatchLoading?.()

    const formattedParams = Object.assign(
      { search: '', perPage: 10, page: 1 },
      params,
    )
    const query = findManyParams.parse(formattedParams)

    const { data, status, headers } = await api.get<FindManyResponse>(
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

export async function findOne(params: FindOneParams, config?: HTTPConfig) {
  try {
    config?.dispatchLoading?.()

    const { postId } = findOneParams.parse(params)

    const { data, status } = await api.get<FindOneResponse>(
      path.findOne(postId),
    )

    return responseMapper(data, status)
  } catch (err) {
    errorMapper(err, config?.errorCallback, config?.unauthorizedCallback)
  } finally {
    config?.dispatchLoading?.()
  }
}

export async function create(params: CreatePostParams, config: HTTPConfig) {
  try {
    config?.dispatchLoading?.()

    const { description, title, thumbnail } = createPostParams.parse(params)
    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', description)

    if (thumbnail) {
      formData.append('thumbnail', {
        name: `image-${thumbnail}.jpg`,
        type: 'image/jpg',
        uri: thumbnail,
      } as any)
    }

    const { status, data } = await api.post<CreatePostResponse>(
      path.create,
      formData,
    )

    return responseMapper(data, status)
  } catch (err) {
    errorMapper(err, config?.errorCallback, config?.unauthorizedCallback)
  } finally {
    config?.dispatchLoading?.()
  }
}
