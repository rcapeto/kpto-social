import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { DevelopersFindOneUsecase } from '~/app/use-cases/developers/findOne/findOne-usecase';
import { renderDeveloper } from '~/app/views/renderDeveloper';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';
import { findOneDeveloperSchema } from '~/validation/developers/findOne';

export class DevelopersMeController implements BaseController {
  constructor(private usecase: DevelopersFindOneUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const id = request.developer_id;
      const { developerId } = findOneDeveloperSchema.parse({ developerId: id });

      const { developer } = await this.usecase.execute({ developerId });

      const successMessage = `Get developer with ID: ${developerId}`;

      logger('success', successMessage);

      return response.status(Status.OK).json({
        data: { developer: renderDeveloper(developer) },
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
