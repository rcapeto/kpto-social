const emptyFieldErrorMessage = (field: string) => {
  return `The ${field} field must be filled in`;
};

function createRequiredError(field: string, errorMessage?: string) {
  const message = emptyFieldErrorMessage(field);
  const required_error = errorMessage ?? message;
  return { required_error };
}

export function getValidationErrors(field: string, errorMessage?: string) {
  return {
    required: createRequiredError(field),
    empty: emptyFieldErrorMessage(field),
  };
}
