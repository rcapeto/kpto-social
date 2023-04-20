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
  PostsUpdateParams,
  PostsUpdateResponse,
  PostsFindManyDeveloperParams,
  PostsFindManyDeveloperResponse,
} from '~/app/repositories/posts';
import { client } from '~/service/prisma';
import { PostEntity } from '~/app/models/entity/post';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';
import { messages } from '@config/messages';

export class PostsPrismaRepository implements PostsRepository {
  async update(params: PostsUpdateParams): PostsUpdateResponse {
    try {
      const { developerId, postId, description, thumbnail, title } = params;

      const post = await this.findOneById(postId);
      const developer = await this.findDeveloperById(developerId);

      if (post.developerId !== developer.id) {
        throw new ErrorMessage(
          messages.AUTHORIZATION_POST_UPDATE,
          ErrorMessageCause.VALIDATION,
        );
      }

      await client.posts.update({
        where: {
          id: post.id,
        },
        data: {
          thumbnail: thumbnail || post.thumbnail,
          title: title || post.title,
          description: description || post.description,
          editAt: new Date(),
        },
      });
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async findOne(params: PostsFindOneParams): PostsFindOneResponse {
    try {
      const { postId } = params;

      const post = await client.posts.findUnique({
        where: {
          id: postId,
        },
        select: {
          _count: {
            select: {
              likes: true,
            },
          },
          createdAt: true,
          editAt: true,
          author: true,
          thumbnail: true,
          description: true,
          id: true,
          developerId: true,
          title: true,
          comments: {
            take: 3,
            select: {
              id: true,
              createdAt: true,
              author: {
                select: {
                  avatar_url: true,
                  name: true,
                  github: true,
                  id: true,
                },
              },
              developerId: true,
              text: true,
            },
          },
        },
      });

      if (!post) {
        throw new ErrorMessage(
          messages.NOT_FOUND_POST,
          ErrorMessageCause.VALIDATION,
        );
      }

      return {
        post: post as unknown as PostEntity,
      };
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async delete(params: PostsDeleteParams): PostsDeleteResponse {
    try {
      const { postId, developerId } = params;

      const post = await this.findOneById(postId);
      const developer = await this.findDeveloperById(developerId);

      if (post.developerId !== developer.id) {
        throw new ErrorMessage(
          messages.AUTHORIZATION_POST_DELETE,
          ErrorMessageCause.VALIDATION,
        );
      }

      await client.posts.delete({
        where: {
          id: post.id,
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
          title: true,
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

  async findManyDeveloperPosts(
    params: PostsFindManyDeveloperParams,
  ): PostsFindManyDeveloperResponse {
    try {
      const { developerId, page, perPage, search } = params;

      const developer = await this.findDeveloperById(developerId);
      const count = await client.posts.count({
        where: {
          developerId: developer.id,
        },
      });

      const posts = await client.posts.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        where: {
          developerId: developer.id,
          OR: [
            {
              title: {
                contains: search,
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
          title: true,
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

  async findOneById(postId: string) {
    const post = await client.posts.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new ErrorMessage(
        messages.NOT_FOUND_POST,
        ErrorMessageCause.VALIDATION,
      );
    }

    return post;
  }

  async findDeveloperById(developerId: string) {
    const developer = await client.developers.findUnique({
      where: {
        id: developerId,
      },
      select: {
        id: true,
      },
    });

    if (!developer) {
      throw new ErrorMessage(
        messages.NOT_FOUND_DEVELOPER,
        ErrorMessageCause.VALIDATION,
      );
    }

    return developer;
  }

  async countCommentsByPost(postId: string) {
    const count = await client.comments.count({
      where: {
        postId: postId,
      },
    });

    return count;
  }
}
