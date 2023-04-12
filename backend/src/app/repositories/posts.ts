import { CreatePostSchema } from '~/validation/posts/create';
import { PostsFindManySchema } from '~/validation/posts/findMany';
import { DeletePostSchema } from '~/validation/posts/delete';
import { PostEntity } from '~/app/models/entity/post';

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

export abstract class PostsRepository {
  create: (params: PostsCreateParams) => PostsCreateResponse;
  findMany: (params: PostsFindManyParams) => PostsFindManyResponse;
  delete: (params: PostsDeleteParams) => PostsDeleteResponse;
}
