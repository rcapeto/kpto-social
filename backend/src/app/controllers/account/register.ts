import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';
import { AccountRegisterUsecase } from '~/app/use-cases/account/register/register-usecase';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getErrorMessage } from '~/utils/getErrorMessage';
import { getZodError } from '~/utils/getZodError';
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
      const isErrorMessage = err instanceof ErrorMessage;
      const { isZodError, message } = getZodError(err);
      const cause = isZodError
        ? ErrorMessageCause.VALIDATION
        : ErrorMessageCause.SERVER;

      const error = getErrorMessage(err, { cause });
      const status = isZodError ? Status.BAD_REQUEST : Status.BAD_REQUEST;
      const isErrorServer = error.cause === ErrorMessageCause.SERVER;
      const _status = isErrorServer ? Status.INTERNAL_SERVER_ERROR : status;

      logger('error', message);

      return response.status(_status).json({
        data: isErrorMessage ? error : new ErrorMessage(message, cause),
      });
    }
  }
}
