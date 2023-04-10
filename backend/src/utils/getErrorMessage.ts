import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';

interface GetErrorMessageConfig {
  cause?: ErrorMessageCause;
  message?: string;
}

export function getErrorMessage(err: any, config?: GetErrorMessageConfig) {
  const { cause, message } = Object.assign(
    {
      cause: ErrorMessageCause.SERVER,
      message: 'Internal Server Error',
    },
    config,
  );

  if (err instanceof ErrorMessage) {
    return err;
  }
  return new ErrorMessage(message, cause);
}
