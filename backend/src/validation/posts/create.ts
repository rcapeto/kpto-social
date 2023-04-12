import { z } from 'zod';
import { getValidationErrors } from '~/validation/validationErrors';

const errors = {
  title: getValidationErrors('title'),
  description: getValidationErrors('description'),
  developerId: getValidationErrors('developerId'),
};

export const createPostSchema = z.object({
  title: z.string(errors.title.required).nonempty(errors.title.empty),
  thumbnail: z.string().nullish(),
  description: z
    .string(errors.description.required)
    .nonempty(errors.description.empty),
  developerId: z
    .string(errors.developerId.required)
    .nonempty(errors.developerId.empty),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
