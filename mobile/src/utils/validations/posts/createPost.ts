import { z } from 'zod'
import { renderValidationError } from '~/utils/validations/renderError'

const errors = {
  description: renderValidationError('descrição'),
  title: renderValidationError('título'),
}

export const createPostSchema = z.object({
  title: z.string(errors.title.required).nonempty(errors.title.empty),
  description: z
    .string(errors.description.required)
    .nonempty(errors.description.empty),
})

export type CreatePostSchema = z.infer<typeof createPostSchema>
