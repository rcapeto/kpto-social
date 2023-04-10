import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { DevelopersDeleteUsecase } from '~/app/use-cases/developers/delete/delete-usecase';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';

export class DevelopersDeleteController implements BaseController {
  constructor(private usecase: DevelopersDeleteUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const developerId = request.developer_id;

      await this.usecase.execute({ developerId });

      const message = `Developer[${developerId}] was deleted with success`;
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
