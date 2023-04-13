import { messages } from '@config/messages';

function createRequiredError(field: string, errorMessage?: string) {
  const message = messages.EMPTY_FIELD(field);
  const required_error = errorMessage ?? message;

  return { required_error };
}

export function getValidationErrors(field: string, errorMessage?: string) {
  return {
    required: createRequiredError(field),
    empty: messages.EMPTY_FIELD(field),
  };
}
