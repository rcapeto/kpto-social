import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { updatePostSchema } from '~/validation/posts/update';
import { getControllerError } from '~/utils/getControllerError';
import { PostsUpdateUsecase } from '~/app/use-cases/posts/update/update-usecase';

export class PostsUpdateController implements BaseController {
  constructor(private usecase: PostsUpdateUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const postId = request.params?.id ?? '';
      const developerId = request.developer_id;
      const { title, description } = request.body;
      const thumbnail = request.file?.filename ?? '';

      const query = { postId, title, description, developerId, thumbnail };
      const params = updatePostSchema.parse(query);

      await this.usecase.execute(params);

      const message = `Post[${postId}] was updated with success!`;
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
