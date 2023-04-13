import { z } from 'zod';
import { getValidationErrors } from '~/validation/validationErrors';

const errors = {
  postId: getValidationErrors('postId'),
  developerId: getValidationErrors('developerId'),
};

export const updatePostSchema = z.object({
  title: z.string().nullish(),
  description: z.string().nullish(),
  thumbnail: z.string().nullish(),
  postId: z.string(errors.postId.required).nonempty(errors.postId.empty),
  developerId: z
    .string(errors.developerId.required)
    .nonempty(errors.developerId.empty),
});

export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
