import { serverConfig } from '@config/server';
import { verify, sign } from 'jsonwebtoken';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';

export interface CreateTokenParams {
  developerId: string;
  github: string;
  expires?: string;
}

export function createToken(params: CreateTokenParams) {
  const secretKey = serverConfig.token.secret_key;

  const { developerId, expires, github } = Object.assign(
    { expires: '7d' },
    params,
  );

  const token = sign({ github }, secretKey, {
    subject: developerId,
    expiresIn: expires,
  });

  return token;
}

/**
 *
 * @returns developerId
 */
export function verifyToken(token: string) {
  const secretKey = serverConfig.token.secret_key;

  try {
    const { sub } = verify(token, secretKey);
    return sub;
  } catch (err) {
    throw new ErrorMessage('Invalid token', ErrorMessageCause.ERROR);
  }
}
