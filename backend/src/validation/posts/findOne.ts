import { z } from 'zod';
import { getValidationErrors } from '~/validation/validationErrors';

const postId = getValidationErrors('postId');

export const findOnePostSchema = z.object({
  postId: z.string(postId.required).nonempty(postId.empty),
});

export type FindOnePostSchema = z.infer<typeof findOnePostSchema>;
