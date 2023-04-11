import { z } from 'zod';

export const findOneDeveloperSchema = z.object({
  developerId: z.string().nonempty('The developerId field must be filled in'),
});

export type FindOneDeveloperSchema = z.infer<typeof findOneDeveloperSchema>;
