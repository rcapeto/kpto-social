import { z } from 'zod';
import { getValidationErrors } from '~/validation/validationErrors';

const error = getValidationErrors('developerId');

export const findOneDeveloperSchema = z.object({
  developerId: z.string(error.required).nonempty(error.empty),
});

export type FindOneDeveloperSchema = z.infer<typeof findOneDeveloperSchema>;
