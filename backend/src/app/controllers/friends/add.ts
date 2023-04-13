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

      const query = { developerId, userId };
      const params = friendshipSchema.parse(query);

      await this.usecase.execute(params);

      const successMessage = `Developer[${developerId}] has a new friend[${params.userId}]`;
      logger('success', successMessage);

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
