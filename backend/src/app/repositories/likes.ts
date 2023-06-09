import { LikesFindManySchema } from '~/validation/likes/findMany';
import { LikeSchema } from '~/validation/likes/others';

export type FindManyLikesParams = LikesFindManySchema;
export type FindManyLikesResponse = Promise<
  Omit<LikesFindManySchema, 'postId'> & {
    likes: any[];
    count: number;
  }
>;

export type LikesCheckParams = LikeSchema;
export type LikesCheckResponse = Promise<{ liked: boolean }>;

export type LikesToggleParams = LikeSchema;
export type LikesToggleResponse = Promise<void>;
export abstract class LikesRepository {
  findMany: (params: FindManyLikesParams) => FindManyLikesResponse;
  check: (params: LikesCheckParams) => LikesCheckResponse;
  toggle: (params: LikesToggleParams) => LikesToggleResponse;
}
