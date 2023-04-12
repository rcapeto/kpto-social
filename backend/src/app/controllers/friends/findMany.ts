import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { FriendsFindManyUsecase } from '~/app/use-cases/friends/findMany/findMany-usecase';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { friendshipFindManySchema } from '~/validation/friends';
import { getControllerError } from '~/utils/getControllerError';
import { renderDeveloper } from '~/app/views/renderDeveloper';

export class FriendsFindManyController implements BaseController {
  constructor(private usecase: FriendsFindManyUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const developerId = request.params?.id ?? '';
      const page = +(request.query?.page ?? 1);
      const perPage = +(request.query?.perPage ?? 10);
      const search = (request.query?.search as string) ?? '';

      const query = { perPage, page, search, developerId };

      const params = friendshipFindManySchema.parse(query);

      const { count, ...rest } = await this.usecase.execute(params);

      const message = `Get Developer[${developerId}] Friends[${count}] with success`;
      logger('success', message);

      response.setHeader('X-TOTAL-COUNT', count);

      return response.status(Status.OK).json({
        data: {
          ...rest,
          friends: rest.friends.map(renderDeveloper),
        },
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
