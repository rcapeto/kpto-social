export function renderValidationError(field: string, message?: string) {
  return {
    required: createRequiredError(field, message),
    empty: createEmptyError(field, message),
  }
}

function createEmptyError(field: string, message?: string) {
  const firstLetter = field?.[0] ?? ''
  const formattedField = field.replace(firstLetter, firstLetter.toUpperCase())

  return message ?? `${formattedField} é obrigatório`
}

function createRequiredError(field: string, message?: string) {
  const defaultMessage = `O campo ${field} deve ser preenchido`
  const required_error = message ?? defaultMessage

  return { required_error }
}
