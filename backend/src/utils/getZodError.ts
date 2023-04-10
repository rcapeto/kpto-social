import { ZodError } from 'zod';

interface GetZodErrorResponse {
  isZodError: boolean;
  message: string;
}

export function getZodError(
  error: any,
  defaultMessageError?: string,
): GetZodErrorResponse {
  const response: GetZodErrorResponse = {
    isZodError: false,
    message: defaultMessageError ?? 'Internal Server Error',
  };

  if (error instanceof ZodError) {
    response.isZodError = true;
    response.message = error.issues.map((issue) => issue.message).join(', ');
  }

  return response;
}
