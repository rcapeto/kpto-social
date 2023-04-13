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
      const { confirm_password, password, github, name } = request.body;

      const query = { confirm_password, password, github, name };
      const params = registerSchema.parse(query);

      await this.usecase.execute(params);

      const successMessage = `Create developer with: ${params.github}`;
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
