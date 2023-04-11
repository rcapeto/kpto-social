import { z } from 'zod';

export const updateDeveloperSchema = z.object({
  name: z.string().nullish(),
  techs: z.string().nullish(),
  password: z.string().nullish(),
});

export type UpdateDeveloperSchema = z.infer<typeof updateDeveloperSchema>;
