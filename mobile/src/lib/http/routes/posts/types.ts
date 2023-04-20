import { z } from 'zod'

import { ApiResponse } from '@http/types/http'
import { renderValidationError } from '~/utils/validations/renderError'
import { FindManyPost } from '~/interfaces/entity/posts'

const errors = {}

export const findManyParams = z.object({
  search: z.string(),
  perPage: z.number(),
  page: z.number(),
})

export type FindManyPostsParams = z.infer<typeof findManyParams>
export type FindManyPostsResponse = ApiResponse<{
  posts: FindManyPost[]
  page: number
  perPage: number
  search: string
  totalPages: number
}>
