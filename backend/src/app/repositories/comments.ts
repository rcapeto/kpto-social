import { FindManyCommentsSchema } from '~/validation/comments/findMany';
import { CommentEntity } from '~/app/models/entity/comment';
import { DeleteCommentSchema } from '~/validation/comments/delete';

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

export type DeleteCommentParams = DeleteCommentSchema;
export type DeleteCommentResponse = Promise<void>;

export abstract class CommentsRepository {
  findMany: (params: FindManyCommentsParams) => FindManyCommentsResponse;
  delete: (params: DeleteCommentParams) => DeleteCommentResponse;
}
