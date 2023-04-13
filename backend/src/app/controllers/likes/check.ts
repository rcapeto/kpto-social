import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { LikesCheckUsecase } from '~/app/use-cases/likes/check/check-usecase';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';
import { likeSchema } from '~/validation/likes/others';

export class LikesCheckController implements BaseController {
  constructor(private usecase: LikesCheckUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const postId = request.params?.id ?? '';
      const developerId = request.developer_id;

      const query = { developerId, postId };
      const params = likeSchema.parse(query);

      const { liked } = await this.usecase.execute(params);

      const successMessage = `Get like from Post[${postId}]`;
      logger('success', successMessage);

      return response.status(Status.OK).json({
        data: { liked },
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
