import { CreatePostSchema } from '~/validation/posts/create';
import { PostsFindManySchema } from '~/validation/posts/findMany';
import { DeletePostSchema } from '~/validation/posts/delete';
import { FindOnePostSchema } from '~/validation/posts/findOne';
import { UpdatePostSchema } from '~/validation/posts/update';
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

export type PostsFindOneParams = FindOnePostSchema;
export type PostsFindOneResponse = Promise<{ post: PostEntity }>;

export type PostsUpdateParams = UpdatePostSchema;
export type PostsUpdateResponse = Promise<void>;

export type PostsFindManyDeveloperParams = PostsFindManySchema & {
  developerId: string;
};
export type PostsFindManyDeveloperResponse = Promise<
  PostsFindManySchema & {
    posts: PostEntity[];
    count: number;
  }
>;

export abstract class PostsRepository {
  create: (params: PostsCreateParams) => PostsCreateResponse;
  findMany: (params: PostsFindManyParams) => PostsFindManyResponse;
  findManyDeveloperPosts: (
    params: PostsFindManyDeveloperParams,
  ) => PostsFindManyDeveloperResponse;
  delete: (params: PostsDeleteParams) => PostsDeleteResponse;
  findOne: (params: PostsFindOneParams) => PostsFindOneResponse;
  update: (params: PostsUpdateParams) => PostsUpdateResponse;
}
