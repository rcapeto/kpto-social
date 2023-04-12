import { z } from 'zod';
import { getValidationErrors } from '~/validation/validationErrors';

const postId = getValidationErrors('postId');

export const findManyCommentsSchema = z.object({
  postId: z.string(postId.required).nonempty(postId.empty),
});

export type FindManyCommentsSchema = z.infer<typeof findManyCommentsSchema>;
