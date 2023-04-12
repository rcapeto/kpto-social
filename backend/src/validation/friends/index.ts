import { z } from 'zod';
import { getValidationErrors } from '~/validation/validationErrors';

const errors = {
  developerId: getValidationErrors('developerId'),
  userId: getValidationErrors('userId'),
};

export const friendshipSchema = z.object({
  developerId: z
    .string(errors.developerId.required)
    .nonempty(errors.developerId.empty),
  userId: z.string(errors.userId.required).nonempty(errors.userId.empty),
});

export type FriendshipSchema = z.infer<typeof friendshipSchema>;

export const friendshipFindManySchema = z.object({
  developerId: z
    .string(errors.developerId.required)
    .nonempty(errors.developerId.empty),
  page: z.number(),
  perPage: z.number(),
  search: z.string(),
});

export type FriendshipFindManySchema = z.infer<typeof friendshipFindManySchema>;
