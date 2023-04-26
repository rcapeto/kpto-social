import { z } from 'zod'

import { ApiResponse } from '@http/types/http'
import { renderValidationError } from '~/utils/validations/renderError'
import { FindManyPost, FindOnePost } from '~/interfaces/entity/posts'

const errors = {
  postId: renderValidationError('postId'),
}

export const findManyParams = z.object({
  search: z.string(),
  perPage: z.number(),
  page: z.number(),
})

export type FindManyParams = z.infer<typeof findManyParams>
export type FindManyResponse = ApiResponse<{
  posts: FindManyPost[]
  page: number
  perPage: number
  search: string
  totalPages: number
}>

export const findOneParams = z.object({
  postId: z.string(errors.postId.required).nonempty(errors.postId.empty),
})

export type FindOneParams = z.infer<typeof findOneParams>
export type FindOneResponse = ApiResponse<{
  post: FindOnePost
}>
