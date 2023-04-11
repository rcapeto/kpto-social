import { z } from 'zod';

export const developersFindManySchema = z.object({
  perPage: z.number(),
  page: z.number(),
  search: z.string(),
});

export type DevelopersFindManySchema = z.infer<typeof developersFindManySchema>;
