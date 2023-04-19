import { z } from 'zod'

import { renderValidationError } from '~/utils/validations/renderError'

const errors = {
  github: renderValidationError('github'),
  password: renderValidationError('senha'),
}

export const loginSchema = z.object({
  github: z.string(errors.github.required).nonempty(errors.github.empty),
  password: z
    .string(errors.password.required)
    .min(6, 'Senha deve conter 6 caractéres')
    .nonempty(errors.password.empty),
})

export type LoginSchema = z.infer<typeof loginSchema>
