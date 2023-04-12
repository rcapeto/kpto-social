import { z } from 'zod';
import { getValidationErrors } from '~/validation/validationErrors';

const errors = {
  postId: getValidationErrors('postId'),
  developerId: getValidationErrors('developerId'),
};

export const likeSchema = z.object({
  postId: z.string(errors.postId.required).nonempty(errors.postId.empty),
  developerId: z
    .string(errors.developerId.required)
    .nonempty(errors.developerId.empty),
});

export type LikeSchema = z.infer<typeof likeSchema>;
