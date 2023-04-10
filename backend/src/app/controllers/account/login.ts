import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { AccountLoginUsecase } from '~/app/use-cases/account/login/login-usecase';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';
import { loginSchema } from '~/validation/account/login';

export class AccountLoginController implements BaseController {
  constructor(private usecase: AccountLoginUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const body = loginSchema.parse(request.body);

      const { token } = await this.usecase.execute(body);

      const successMessage = `Developer login with success: ${body.github}`;
      logger('success', successMessage);

      return response.status(Status.OK).json({
        data: { token },
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
