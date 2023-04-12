import { CreatePostSchema } from '~/validation/posts/create';
import { PostsFindManySchema } from '~/validation/posts/findMany';
import { DeletePostSchema } from '~/validation/posts/delete';
import { FindOnePostSchema } from '~/validation/posts/findOne';
import { UpdatePostSchema } from '~/validation/posts/update';

import { PostEntity } from '~/app/models/entity/post';
import { CommentEntity } from '../models/entity/comment';

export type PostsCreateParams = CreatePostSchema;
export type PostsCreateResponse = Promise<void>;

export type PostsFindManyParams = PostsFindManySchema;
export type PostsFindManyResponse = Promise<
  PostsFindManySchema & {
    posts: PostEntity[];
    count: number;
  }
>;

export type PostsDeleteParams = DeletePostSchema;
export type PostsDeleteResponse = Promise<void>;

export type PostsFindOneParams = FindOnePostSchema;
export type PostsFindOneResponse = Promise<{ post: PostEntity }>;

export type PostsUpdateParams = UpdatePostSchema;
export type PostsUpdateResponse = Promise<void>;

export type PostsGetCommentsAndLikesParams = FindOnePostSchema &
  PostsFindManyParams;
export type PostGetCommentsResponse = Promise<
  PostsFindManySchema & {
    comments: CommentEntity[];
    count: number;
  }
>;
export type PostGetLikesResponse = Promise<
  PostsFindManySchema & {
    likes: any[];
    count: number;
  }
>;

export abstract class PostsRepository {
  create: (params: PostsCreateParams) => PostsCreateResponse;
  findMany: (params: PostsFindManyParams) => PostsFindManyResponse;
  delete: (params: PostsDeleteParams) => PostsDeleteResponse;
  findOne: (params: PostsFindOneParams) => PostsFindOneResponse;
  update: (params: PostsUpdateParams) => PostsUpdateResponse;

  comments: (params: PostsGetCommentsAndLikesParams) => PostGetCommentsResponse;
  // likes: (params: PostsGetCommentsAndLikesParams) => PostGetLikesResponse;
}
