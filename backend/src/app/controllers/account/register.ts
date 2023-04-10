import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { AccountRegisterUsecase } from '~/app/use-cases/account/register/register-usecase';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';
import { registerSchema } from '~/validation/account/register';

export class AccountRegisterController implements BaseController {
  constructor(private usecase: AccountRegisterUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const body = registerSchema.parse(request.body);

      await this.usecase.execute(body);

      const successMessage = `Create developer with: ${body.github}`;
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
