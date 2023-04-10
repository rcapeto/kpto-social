import { z } from 'zod';

export const loginSchema = z.object({
  github: z.string().nonempty('The github field must be filled in'),
  password: z
    .string()
    .nonempty('The password field must be filled in')
    .min(6, 'The password field must contain at least 6 characters'),
});
export type LoginSchema = z.infer<typeof loginSchema>;
