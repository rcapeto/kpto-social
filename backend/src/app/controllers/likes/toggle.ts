import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { LikesToggleUsecase } from '~/app/use-cases/likes/toggle/toggle-usecase';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';
import { likeSchema } from '~/validation/likes/others';

export class LikesToggleController implements BaseController {
  constructor(private usecase: LikesToggleUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const postId = request.params?.id ?? '';
      const developerId = request.developer_id;

      const query = { developerId, postId };
      const params = likeSchema.parse(query);

      await this.usecase.execute(params);

      const successMessage = `Developer[${developerId}] like/dislike Post[${postId}] with success`;
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
