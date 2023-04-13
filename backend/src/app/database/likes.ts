import { getErrorMessage } from '~/utils/getErrorMessage';
import { client } from '~/service/prisma';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';
import {
  LikesRepository,
  FindManyLikesParams,
  FindManyLikesResponse,
  LikesCheckParams,
  LikesCheckResponse,
  LikesToggleParams,
  LikesToggleResponse,
} from '~/app/repositories/likes';
import { messages } from '@config/messages';

export class LikesPrismaRepository implements LikesRepository {
  async toggle(params: LikesToggleParams): LikesToggleResponse {
    try {
      const { developerId, postId } = params;

      const post = await this.findPostById(postId);
      const developer = await this.findDeveloperById(developerId);

      const [like] = await client.likes.findMany({
        where: {
          postId: post.id,
          developerId: developer.id,
        },
      });

      if (!like) {
        await client.likes.create({
          data: {
            developerId: developer.id,
            postId: post.id,
          },
        });
      } else {
        await client.likes.delete({
          where: {
            id: like.id,
          },
        });
      }
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async check(params: LikesCheckParams): LikesCheckResponse {
    try {
      const { postId, developerId } = params;

      const post = await this.findPostById(postId);

      const [isLiked] = await client.likes.findMany({
        where: {
          postId: post.id,
          developerId,
        },
      });

      const liked = !!isLiked;

      return { liked };
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async findMany(params: FindManyLikesParams): FindManyLikesResponse {
    try {
      const { page, perPage, postId, search } = params;

      const post = await this.findPostById(postId);
      const count = await this.countLikes(postId);

      const likes = await client.likes.findMany({
        where: {
          postId: post.id,
          OR: [
            {
              author: {
                name: {
                  contains: search,
                },
              },
            },
          ],
        },
        select: {
          id: true,
          author: {
            select: {
              name: true,
            },
          },
          developerId: true,
          postId: true,
        },
      });

      return {
        count,
        likes,
        page,
        perPage,
        search,
      };
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
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

  async countLikes(postId: string) {
    const count = await client.likes.count({
      where: {
        postId,
      },
    });

    return count;
  }

  async findPostById(postId: string) {
    const post = await client.posts.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
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
}
