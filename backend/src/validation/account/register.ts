import { z } from 'zod';
import { getValidationErrors } from '~/validation/validationErrors';

const errors = {
  name: getValidationErrors('name'),
  github: getValidationErrors('github'),
  password: getValidationErrors('password'),
  confirm_password: getValidationErrors('confirm_password'),
};

export const registerSchema = z
  .object({
    name: z.string(errors.name.required).nonempty(errors.name.empty),
    github: z.string(errors.github.required).nonempty(errors.github.empty),
    password: z
      .string(errors.password.required)
      .nonempty(errors.password.empty)
      .min(6, 'The password field must contain at least 6 characters'),
    confirm_password: z
      .string(errors.confirm_password.required)
      .nonempty(errors.confirm_password.empty)
      .min(6, 'The confirm_password field must contain at least 6 characters'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
