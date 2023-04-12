import { FindManyCommentsSchema } from '~/validation/comments/findMany';
import { CommentEntity } from '~/app/models/entity/comment';
import { DeleteCommentSchema } from '~/validation/comments/delete';
import { CreateCommentSchema } from '~/validation/comments/create';

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

export type CreateCommentParams = CreateCommentSchema;
export type CreateCommentResponse = Promise<void>;

export abstract class CommentsRepository {
  findMany: (params: FindManyCommentsParams) => FindManyCommentsResponse;
  delete: (params: DeleteCommentParams) => DeleteCommentResponse;
  create: (params: CreateCommentParams) => CreateCommentResponse;
}
