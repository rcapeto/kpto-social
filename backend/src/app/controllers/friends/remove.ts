import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { FriendsRemoveUsecase } from '~/app/use-cases/friends/remove/remove-usecase';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { friendshipSchema } from '~/validation/friends';
import { getControllerError } from '~/utils/getControllerError';

export class FriendsRemoveController implements BaseController {
  constructor(private usecase: FriendsRemoveUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const developerId = request.developer_id;
      const userId = request.params?.id ?? '';
      const params = friendshipSchema.parse({ developerId, userId });

      await this.usecase.execute(params);

      const message = `Developer[${developerId}] remove a friend[${params.userId}]`;
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
