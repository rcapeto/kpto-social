import { z } from 'zod'

import { renderValidationError } from '~/utils/validations/renderError'
import { checkAllPasswordsType } from '~/utils/validations/checkPassword'

const errors = {
  confirm_password: renderValidationError('confirmação de senha'),
  password: renderValidationError('senha'),
  github: renderValidationError('gitgub'),
  name: renderValidationError('nome'),
}

export const registerSchema = z
  .object({
    github: z
      .string(errors.github.required)
      .nonempty(errors.confirm_password.empty),
    name: z.string(errors.name.required).nonempty(errors.name.empty),
    password: z
      .string(errors.password.required)
      .min(6, 'Senha deve conter 6 caractéres')
      .nonempty(errors.password.empty),
    confirm_password: z
      .string(errors.confirm_password.required)
      .min(6, 'Confirmação de senha deve conter 6 caractéres')
      .nonempty(errors.confirm_password.empty),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Os campos de senha devem ser iguais',
    path: ['confirm_password'],
  })
  .refine(
    (data) => {
      const { hasError } = checkAllPasswordsType(data.password)
      return !hasError
    },
    {
      message: 'Senha deve conter os requisitos básicos',
      path: ['password'],
    },
  )

export type RegisterSchema = z.infer<typeof registerSchema>
