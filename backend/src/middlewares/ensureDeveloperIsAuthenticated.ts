import { Request, Response, NextFunction } from 'express';

import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';
import { verifyToken } from '~/utils/token';
import { Status } from '~/constants/status';

export function ensureDeveloperIsAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const header = request.headers;

  const unauthorizedError = ErrorMessageCause.UNAUTHORIZED;
  const isUnauthorizedMessage = 'Please sign in to use this route.';
  const error = new ErrorMessage(isUnauthorizedMessage, unauthorizedError);
  const status = Status.UNAUTHORIZED;
  const responseJSON = { data: error };

  const hasAuthorizationHeader = header.authorization;

  if (!hasAuthorizationHeader) {
    return response.status(status).json(responseJSON);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, token] = header.authorization?.split(' ') as string[];

  if (!token) {
    return response.status(status).json({
      data: error,
    });
  }

  try {
    const developerId = verifyToken(token) as string;

    request.developer_id = developerId;

    return next();
  } catch (err) {
    request.developer_id = '';

    return response.status(status).json(responseJSON);
  }
}
