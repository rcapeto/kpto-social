import { useInfiniteQuery } from 'react-query'
import { http } from '@http/index'
import { picker } from '~/utils/picker'
import { HTTPErrorCallback } from '~/lib/http/types/http'
import { wait } from '~/utils/wait'

interface Params {
  perPage?: number
  search?: string
  page?: number
}

export type HookParams = Omit<Params, 'page'>

async function findManyPosts(
  params: Required<Params>,
  errorCallback?: HTTPErrorCallback,
) {
  const response = await http
    .getPostRoutes()
    .findMany(params, { errorCallback })

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

export function usePosts(
  params: HookParams,
  errorCallback?: HTTPErrorCallback,
) {
  const query = Object.assign({ search: '', perPage: 10 }, params)

  return useInfiniteQuery(
    ['developers', params.search],
    async ({ pageParam = 1 }) =>
      await findManyPosts({ ...query, page: pageParam }, errorCallback),
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
