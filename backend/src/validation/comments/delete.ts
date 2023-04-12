import { z } from 'zod';
import { getValidationErrors } from '../validationErrors';

const errors = {
  commentId: getValidationErrors('commentId'),
  developerId: getValidationErrors('developerId'),
};

export const deleteCommentSchema = z.object({
  commentId: z
    .string(errors.commentId.required)
    .nonempty(errors.commentId.empty),
  developerId: z
    .string(errors.developerId.required)
    .nonempty(errors.developerId.empty),
});

export type DeleteCommentSchema = z.infer<typeof deleteCommentSchema>;
