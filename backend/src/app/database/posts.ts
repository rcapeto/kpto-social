import { getErrorMessage } from '~/utils/getErrorMessage';
import {
  PostsCreateParams,
  PostsRepository,
  PostsCreateResponse,
  PostsFindManyParams,
  PostsFindManyResponse,
  PostsDeleteParams,
  PostsDeleteResponse,
  PostsFindOneResponse,
  PostsFindOneParams,
} from '../repositories/posts';
import { client } from '~/service/prisma';
import { PostEntity } from '~/app/models/entity/post';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';

export class PostsPrismaRepository implements PostsRepository {
  async findOne(params: PostsFindOneParams): PostsFindOneResponse {
    try {
      const { postId } = params;

      const post = await client.posts.findUnique({
        where: {
          id: postId,
        },
        select: {
          _count: true,
          createdAt: true,
          editAt: true,
          author: true,
          thumbnail: true,
          description: true,
          id: true,
          developerId: true,
        },
      });

      return {
        post: post as PostEntity,
      };
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async delete(params: PostsDeleteParams): PostsDeleteResponse {
    try {
      const { postId, developerId } = params;

      const post = await client.posts.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        throw new ErrorMessage(
          'Post does not exists, please check the ID',
          ErrorMessageCause.VALIDATION,
        );
      }

      if (post.developerId !== developerId) {
        throw new ErrorMessage(
          'You can not delete this post, only the post author can delete it.',
          ErrorMessageCause.VALIDATION,
        );
      }

      await client.posts.delete({
        where: {
          id: postId,
        },
      });
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }
  async findMany(params: PostsFindManyParams): PostsFindManyResponse {
    try {
      const { page, perPage, search } = params;

      const count = await this.countPosts();
      const posts = await client.posts.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        where: {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              author: {
                name: {
                  contains: search,
                },
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
        },
        select: {
          _count: true,
          author: true,
          createdAt: true,
          description: true,
          editAt: true,
          developerId: true,
          id: true,
          thumbnail: true,
        },
      });

      return {
        count,
        page,
        perPage,
        posts: posts as PostEntity[],
        search,
      };
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async create(params: PostsCreateParams): PostsCreateResponse {
    try {
      const { description, developerId, title, thumbnail } = params;

      await client.posts.create({
        data: {
          description,
          thumbnail: thumbnail ?? '',
          title,
          developerId,
        },
      });
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async countPosts() {
    const count = await client.posts.count();
    return count;
  }
}
