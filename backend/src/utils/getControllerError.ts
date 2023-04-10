import { getErrorMessage } from '~/utils/getErrorMessage';
import { getZodError } from '~/utils/getZodError';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';
import { Status } from '~/constants/status';

interface GetControllerErrorResponse {
  error: ErrorMessage;
  message: string;
  status: Status;
}

export function getControllerError(err: any): GetControllerErrorResponse {
  const { isZodError, message } = getZodError(err);
  const error = getErrorMessage(err);

  if (isZodError) {
    return {
      error: new ErrorMessage(message, ErrorMessageCause.VALIDATION),
      message: message,
      status: Status.BAD_REQUEST,
    };
  } else {
    const serverError = error.cause === ErrorMessageCause.SERVER;

    return {
      error,
      message: error.message,
      status: serverError ? Status.INTERNAL_SERVER_ERROR : Status.BAD_REQUEST,
    };
  }
}
