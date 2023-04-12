import { LikesFindManySchema } from '~/validation/likes/findMany';

export type FindManyLikesParams = LikesFindManySchema;
export type FindManyLikesResponse = Promise<
  Omit<LikesFindManySchema, 'postId'> & {
    likes: any[];
    count: number;
  }
>;

export abstract class LikesRepository {
  findMany: (params: FindManyLikesParams) => FindManyLikesResponse;
}
