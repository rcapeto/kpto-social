import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { deletePostSchema } from '~/validation/posts/delete';
import { getControllerError } from '~/utils/getControllerError';
import { PostsDeleteUsecase } from '~/app/use-cases/posts/delete/delete-usecase';

export class PostsDeleteController implements BaseController {
  constructor(private usecase: PostsDeleteUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const postId = request.params?.id ?? '';
      const developerId = request.developer_id;
      const params = deletePostSchema.parse({ postId, developerId });

      await this.usecase.execute(params);

      const message = `Post[${postId}] was deleted with success!`;
      logger('success', message);

      return response.status(Status.OK).send();
    } catch (err) {
      const { error, message, status } = getControllerError(err);

      logger('error', message);

      return response.status(status).json({
        data: error,
      });
    }
  }
}
