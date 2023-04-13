import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { DevelopersFindManyUsecase } from '~/app/use-cases/developers/findMany/findMany-usecase';
import { renderDeveloper } from '~/app/views/renderDeveloper';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';
import { developersFindManySchema } from '~/validation/developers/findMany';

export class DevelopersFindManyController implements BaseController {
  constructor(private usecase: DevelopersFindManyUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const page = +(request.query?.page ?? 1);
      const perPage = +(request.query?.perPage ?? 10);
      const search = (request.query?.search as string) ?? '';

      const query = { perPage, page, search };
      const params = developersFindManySchema.parse(query);

      const { count, developers, ...rest } = await this.usecase.execute(params);

      const successMessage = `Get all developers[${count}] with success`;
      logger('success', successMessage);

      const formattedDevelopers = (developers ?? []).map(renderDeveloper);

      response.setHeader('X-TOTAL-COUNT', count);

      return response.status(Status.OK).json({
        data: {
          developer: formattedDevelopers,
          ...rest,
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
