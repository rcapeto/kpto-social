import { getErrorMessage } from '~/utils/getErrorMessage';
import {
  CommentsRepository,
  FindManyCommentsParams,
  FindManyCommentsResponse,
  DeleteCommentParams,
  DeleteCommentResponse,
  CreateCommentParams,
  CreateCommentResponse,
} from '~/app/repositories/comments';
import { CommentEntity } from '~/app/models/entity/comment';
import { client } from '~/service/prisma';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';
import { messages } from '@config/messages';

export class CommentsPrismaRepository implements CommentsRepository {
  async create(params: CreateCommentParams): CreateCommentResponse {
    try {
      const { developerId, postId, text } = params;

      const post = await this.findPostById(postId);
      const developer = await this.findDeveloperById(developerId);

      await client.comments.create({
        data: {
          developerId: developer.id,
          postId: post.id,
          text,
        },
      });
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async delete(params: DeleteCommentParams): DeleteCommentResponse {
    try {
      const { commentId, developerId } = params;

      const developer = await this.findDeveloperById(developerId);

      const comment = await client.comments.findUnique({
        where: {
          id: commentId,
        },
        select: {
          id: true,
          developerId: true,
        },
      });

      if (!comment) {
        throw new ErrorMessage(
          messages.NOT_FOUND_COMMENT,
          ErrorMessageCause.VALIDATION,
        );
      }

      if (comment.developerId !== developer.id) {
        throw new ErrorMessage(
          messages.AUTHORIZATION_COMMENT,
          ErrorMessageCause.VALIDATION,
        );
      }

      await client.comments.delete({
        where: {
          id: comment.id,
        },
      });
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async findMany(params: FindManyCommentsParams): FindManyCommentsResponse {
    try {
      const { postId, page, perPage, search } = params;

      const post = await this.findPostById(postId);
      const count = await this.countComments(postId);

      const comments = await client.comments.findMany({
        where: {
          postId: post.id,
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

  async countComments(postId: string) {
    const count = await client.comments.count({
      where: {
        postId: postId,
      },
    });

    return count;
  }
}
