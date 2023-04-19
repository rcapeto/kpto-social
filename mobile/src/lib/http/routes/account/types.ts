import { z } from 'zod'

import { ApiResponse } from '@http/types/http'
import { renderValidationError } from '~/utils/validations/renderError'
import { MeDeveloper } from '~/interfaces/entity/developer'

const errors = {
  password: renderValidationError('senha'),
  github: renderValidationError('github'),
  confirm_password: renderValidationError('confirmação de senha'),
  name: renderValidationError('nome'),
  token: renderValidationError('token'),
}

export const loginParams = z.object({
  password: z.string(errors.password.required).nonempty(errors.password.empty),
  github: z.string(errors.github.required).nonempty(errors.github.empty),
})

export type LoginParams = z.infer<typeof loginParams>
export type LoginResponse = ApiResponse<{
  token: string
}>

export const registerParams = z.object({
  password: z.string(errors.password.required).nonempty(errors.password.empty),
  github: z.string(errors.github.required).nonempty(errors.github.empty),
  confirm_password: z
    .string(errors.confirm_password.required)
    .nonempty(errors.confirm_password.empty),
  name: z.string(errors.name.required).nonempty(errors.name.empty),
})

export type RegisterParams = z.infer<typeof registerParams>
export type RegisterResponse = ApiResponse<void>

export const meParams = z.object({
  token: z.string(errors.token.required),
})

export type MeParams = z.infer<typeof meParams>
export type MeResponse = ApiResponse<{
  developer: MeDeveloper
}>
