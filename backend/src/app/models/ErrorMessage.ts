export enum ErrorMessageCause {
  VALIDATION = 'validation_error',
  SERVER = 'server_error',
  UNAUTHORIZED = 'unauthorized_error',
  ERROR = 'error',
}

export class ErrorMessage {
  public error: boolean;

  constructor(public message: string, public cause: ErrorMessageCause) {
    this.error = true;
  }
}
