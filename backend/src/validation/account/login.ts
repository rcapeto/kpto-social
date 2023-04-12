import { z } from 'zod';
import { getValidationErrors } from '~/validation/validationErrors';

const errors = {
  github: getValidationErrors('github'),
  password: getValidationErrors('password'),
};

export const loginSchema = z.object({
  github: z.string(errors.github.required).nonempty(errors.github.empty),
  password: z
    .string(errors.password.required)
    .nonempty(errors.password.empty)
    .min(6, 'The password field must contain at least 6 characters'),
});
export type LoginSchema = z.infer<typeof loginSchema>;
