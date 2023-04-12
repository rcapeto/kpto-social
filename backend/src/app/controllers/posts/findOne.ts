import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { findOnePostSchema } from '~/validation/posts/findOne';
import { getControllerError } from '~/utils/getControllerError';
import { PostsFindOneUsecase } from '~/app/use-cases/posts/findOne/findOne-usecase';
import { renderPost } from '~/app/views/renderPost';

export class PostsFindOneController implements BaseController {
  constructor(private usecase: PostsFindOneUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const postId = request.params?.id ?? '';
      const params = findOnePostSchema.parse({ postId });

      const { post } = await this.usecase.execute(params);

      const message = `Post[${postId}] get with success`;
      logger('success', message);

      return response.status(Status.OK).json({
        data: {
          post: renderPost(post),
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
