import { z } from 'zod';
import { getValidationErrors } from '~/validation/validationErrors';

const postId = getValidationErrors('postId');

export const likesFindManySchema = z.object({
  perPage: z.number(),
  page: z.number(),
  search: z.string(),
  postId: z.string(postId.required).nonempty(postId.empty),
});

export type LikesFindManySchema = z.infer<typeof likesFindManySchema>;
