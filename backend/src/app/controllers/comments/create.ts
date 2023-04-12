import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { CommentsCreateUsecase } from '~/app/use-cases/comments/create/create-usecase';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';
import { createCommentSchema } from '~/validation/comments/create';

export class CommentsCreateController implements BaseController {
  constructor(private usecase: CommentsCreateUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const developerId = request.developer_id;
      const { postId, text } = request.body;

      const query = { developerId, postId, text };
      const params = createCommentSchema.parse(query);

      await this.usecase.execute(params);

      const successMessage = `Comment created with success by Developer[${developerId}]`;
      logger('success', successMessage);

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
