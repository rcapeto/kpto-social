import { useInfiniteQuery } from 'react-query'
import { http } from '@http/index'
import { picker } from '~/utils/picker'
import { HTTPConfig, HTTPErrorCallback } from '@http/types/http'

interface Params {
  perPage?: number
  search?: string
  page?: number
}

export type HookParams = Omit<Params, 'page'>

async function findManyPosts(params: Required<Params>, httpConfig: HTTPConfig) {
  const response = await http.getPostRoutes().findMany(params, httpConfig)

  if (response && picker(response, 'data')) {
    const page = response.data.page ?? 1
    const perPage = response.data.perPage ?? 10

    const posts = response.data.posts ?? []
    const totalPages = Math.ceil(response.count / perPage)
    const nextPage = page < totalPages ? page + 1 : page

    return {
      totalPages,
      nextPage,
      hasNextPage: nextPage !== page,
      count: response.count ?? 0,
      posts,
    }
  }

  return {
    hasNextPage: false,
  }
}

export function usePosts(params: HookParams, httpConfig: HTTPConfig) {
  const query = Object.assign({ search: '', perPage: 10 }, params)

  return useInfiniteQuery(
    ['developers', params.search],
    async ({ pageParam = 1 }) =>
      await findManyPosts({ ...query, page: pageParam }, httpConfig),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.hasNextPage) {
          return lastPage?.nextPage
        }

        return undefined
      },
      keepPreviousData: true,
    },
  )
}
