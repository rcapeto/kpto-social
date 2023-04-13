import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { DevelopersFindOneUsecase } from '~/app/use-cases/developers/findOne/findOne-usecase';
import { renderDeveloper } from '~/app/views/renderDeveloper';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';
import { findOneDeveloperSchema } from '~/validation/developers/findOne';

export class DevelopersFindOneController implements BaseController {
  constructor(private usecase: DevelopersFindOneUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const developerId = request.params?.id ?? '';

      const query = { developerId };
      const params = findOneDeveloperSchema.parse(query);

      const { developer } = await this.usecase.execute(params);

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
