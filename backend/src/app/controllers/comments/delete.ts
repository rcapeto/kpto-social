import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { CommentsDeleteUsecase } from '~/app/use-cases/comments/delete/delete-usecase';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';
import { deleteCommentSchema } from '~/validation/comments/delete';

export class CommentsDeleteController implements BaseController {
  constructor(private usecase: CommentsDeleteUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const developerId = request.developer_id;
      const commentId = request.params?.id ?? '';

      const query = { developerId, commentId };

      const params = deleteCommentSchema.parse(query);

      await this.usecase.execute(params);

      const successMessage = `Delete comment[${commentId}] with success`;
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
