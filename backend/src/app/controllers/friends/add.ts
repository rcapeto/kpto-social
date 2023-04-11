import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { FriendsAddUsecase } from '~/app/use-cases/friends/add/add-usecase';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { friendshipSchema } from '~/validation/friends';
import { getControllerError } from '~/utils/getControllerError';

export class FriendsAddController implements BaseController {
  constructor(private usecase: FriendsAddUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const developerId = request.developer_id;
      const userId = request.params?.id ?? '';
      const params = friendshipSchema.parse({ developerId, userId });

      await this.usecase.execute(params);

      const message = `Developer[${developerId}] has a new friend[${params.userId}]`;
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
