import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().nonempty('The name field must be filled in'),
    github: z.string().nonempty('The github field must be filled in'),
    password: z
      .string()
      .nonempty('The password field must be filled in')
      .min(6, 'The password field must contain at least 6 characters'),
    confirm_password: z
      .string()
      .nonempty('The confirm_password field must be filled in')
      .min(6, 'The confirm_password field must contain at least 6 characters'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
