import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { DevelopersUpdateUsecase } from '~/app/use-cases/developers/update/update-usecase';
import { renderDeveloper } from '~/app/views/renderDeveloper';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';
import { updateDeveloperSchema } from '~/validation/developers/update';

export class DevelopersUpdateController implements BaseController {
  constructor(private usecase: DevelopersUpdateUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const developerId = request.developer_id;
      const { name, password, techs } = request.body;
      const avatar_url = request.file?.filename ?? '';

      const query = { name, password, techs, developerId, avatar_url };
      const params = updateDeveloperSchema.parse(query);

      await this.usecase.execute(params);

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
