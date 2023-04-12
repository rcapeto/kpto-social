import { getErrorMessage } from '~/utils/getErrorMessage';
import {
  CommentsRepository,
  FindManyCommentsParams,
  FindManyCommentsResponse,
} from '~/app/repositories/comments';
import { CommentEntity } from '../models/entity/comment';
import { client } from '~/service/prisma';
import { ErrorMessage, ErrorMessageCause } from '../models/ErrorMessage';

export class CommentsPrismaRepository implements CommentsRepository {
  async findMany(params: FindManyCommentsParams): FindManyCommentsResponse {
    try {
      const { postId, page, perPage, search } = params;

      const post = await this.findPostWithId(postId);

      if (!post) {
        throw new ErrorMessage(
          'Post does not exists, please check the ID',
          ErrorMessageCause.VALIDATION,
        );
      }

      const count = await this.countComments(postId);

      const comments = await client.comments.findMany({
        where: {
          postId: postId,
          OR: [
            {
              text: {
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
          ],
        },
        take: perPage,
        skip: (page - 1) * perPage,
        select: {
          author: {
            select: {
              name: true,
              github: true,
              avatar_url: true,
              id: true,
            },
          },
          text: true,
          createdAt: true,
          postId: true,
          id: true,
        },
      });

      return {
        comments: comments as unknown as CommentEntity[],
        count,
        page,
        perPage,
        search,
      };
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async findPostWithId(postId: string) {
    const post = await client.posts.findUnique({
      where: {
        id: postId,
      },
    });
    return post;
  }

  async countComments(postId: string) {
    const count = await client.comments.count({
      where: {
        postId: postId,
      },
    });

    return count;
  }
}
