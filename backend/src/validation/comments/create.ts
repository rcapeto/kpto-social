import { z } from 'zod';
import { getValidationErrors } from '../validationErrors';

const errors = {
  developerId: getValidationErrors('developerId'),
  postId: getValidationErrors('postId'),
  text: getValidationErrors('text'),
};

export const createCommentSchema = z.object({
  developerId: z
    .string(errors.developerId.required)
    .nonempty(errors.developerId.empty),
  postId: z.string(errors.postId.required).nonempty(errors.postId.empty),
  text: z.string(errors.text.required).nonempty(errors.text.empty),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
