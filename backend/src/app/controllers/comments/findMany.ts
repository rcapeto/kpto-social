import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { CommentsFindManyUsecase } from '~/app/use-cases/comments/findMany/findMany-usecase';
import { renderComment } from '~/app/views/renderComment';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';

export class CommentsFindManyController implements BaseController {
  constructor(private usecase: CommentsFindManyUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const page = +(request.query?.page ?? 1);
      const perPage = +(request.query?.perPage ?? 10);
      const search = (request.query?.search as string) ?? '';
      const postId = request.params?.id ?? '';

      const query = { perPage, page, search, postId };

      const { comments, count, ...rest } = await this.usecase.execute(query);

      const successMessage = `Get all Post[${postId}] comments[${count}] with success`;

      logger('success', successMessage);

      response.setHeader('X-TOTAL-COUNT', count);

      const formattedComments = comments.map(renderComment);

      return response.status(Status.OK).json({
        data: {
          ...rest,
          comments: formattedComments,
        },
      });
    } catch (err) {
      const { error, message, status } = getControllerError(err);

      logger('error', message);

      return response.status(status).json({
        data: error,
      });
    }
  }
}
