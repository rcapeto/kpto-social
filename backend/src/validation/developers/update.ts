import { z } from 'zod';
import { getValidationErrors } from '~/validation/validationErrors';

const developerId = getValidationErrors('developerId');

export const updateDeveloperSchema = z.object({
  name: z.string().nullish(),
  techs: z.string().nullish(),
  password: z.string().nullish(),
  avatar_url: z.string().nullish(),
  developerId: z.string(developerId.required).nonempty(developerId.empty),
});

export type UpdateDeveloperSchema = z.infer<typeof updateDeveloperSchema>;
