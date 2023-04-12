import { z } from 'zod';

export const postsFindManySchema = z.object({
  perPage: z.number(),
  page: z.number(),
  search: z.string(),
});

export type PostsFindManySchema = z.infer<typeof postsFindManySchema>;
