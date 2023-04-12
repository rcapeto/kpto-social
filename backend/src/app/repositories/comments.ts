import { FindManyCommentsSchema } from '~/validation/comments/findMany';
import { CommentEntity } from '~/app/models/entity/comment';

interface BaseSearchInterface {
  search: string;
  perPage: number;
  page: number;
}

export type FindManyCommentsParams = FindManyCommentsSchema &
  BaseSearchInterface;
export type FindManyCommentsResponse = Promise<
  {
    comments: CommentEntity[];
    count: number;
  } & BaseSearchInterface
>;

export abstract class CommentsRepository {
  findMany: (params: FindManyCommentsParams) => FindManyCommentsResponse;
}
