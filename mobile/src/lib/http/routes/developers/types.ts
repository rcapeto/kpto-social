import { z } from 'zod'

import { ApiResponse } from '@http/types/http'
import { renderValidationError } from '~/utils/validations/renderError'
import { FindOneDeveloper } from '~/interfaces/entity/developer'

const errors = {
  developerId: renderValidationError('developerId'),
}

export const findOneParams = z.object({
  developerId: z
    .string(errors.developerId.required)
    .nonempty(errors.developerId.empty),
})

export type FindOneParams = z.infer<typeof findOneParams>
export type FindOneResponse = ApiResponse<{
  developer: FindOneDeveloper
}>
