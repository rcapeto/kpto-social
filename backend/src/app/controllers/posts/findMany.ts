import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { PostsFindManyUsecase } from '~/app/use-cases/posts/findMany/findMany-usecase';
import { renderPost } from '~/app/views/renderPost';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';

export class PostsFindManyController implements BaseController {
  constructor(private usecase: PostsFindManyUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const page = +(request.query?.page ?? 1);
      const perPage = +(request.query?.perPage ?? 10);
      const search = (request.query?.search as string) ?? '';

      const query = { perPage, page, search };

      const { count, posts, ...rest } = await this.usecase.execute(query);

      const successMessage = `Get all posts[${count}] with success`;
      logger('success', successMessage);

      const formattedPosts = (posts ?? []).map(renderPost);

      response.setHeader('X-TOTAL-COUNT', count);

      return response.status(Status.OK).json({
        data: {
          posts: formattedPosts,
          ...rest,
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
