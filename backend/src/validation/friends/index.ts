import { z } from 'zod';

export const friendshipSchema = z.object({
  developerId: z.string().nonempty('The developerId field must be filled in'),
  userId: z.string().nonempty('The userId field must be filled in'),
});

export type FriendshipSchema = z.infer<typeof friendshipSchema>;

export const friendshipFindManySchema = z.object({
  id: z.string().nonempty('The id field must be filled in'),
  page: z.number(),
  perPage: z.number(),
  search: z.string(),
});

export type FriendshipFindManySchema = z.infer<typeof friendshipFindManySchema>;
