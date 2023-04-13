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

      const query = { developerId, userId };
      const params = friendshipSchema.parse(query);

      await this.usecase.execute(params);

      const successMessage = `Developer[${developerId}] remove a friend[${params.userId}]`;
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
