import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { CreatePostSchema, createPostSchema } from '~/validation/posts/create';
import { getControllerError } from '~/utils/getControllerError';
import { PostsCreateUsecase } from '~/app/use-cases/posts/create/create-usecase';

export class PostsCreateController implements BaseController {
  constructor(private usecase: PostsCreateUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const developerId = request.developer_id;
      const thumbnail = request.file?.filename ?? '';

      const data: CreatePostSchema = Object.assign(
        { developerId, thumbnail },
        request.body,
      );

      const params = createPostSchema.parse(data);
      await this.usecase.execute(params);

      const message = `A new post was created, by: Developer[${developerId}]`;
      logger('success', message);

      return response.status(Status.CREATED).send();
    } catch (err) {
      const { error, message, status } = getControllerError(err);

      logger('error', message);

      return response.status(status).json({
        data: error,
      });
    }
  }
}
