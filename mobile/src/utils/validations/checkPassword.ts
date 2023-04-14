type CheckpasswordType =
  | 'uppercase'
  | 'lowercase'
  | 'specialChars'
  | 'number'
  | 'hasLenght'

type CheckPasswordResponse = (text: string, length?: number) => boolean

export function checkPassword(type: CheckpasswordType): CheckPasswordResponse {
  return function (text: string, length?: number) {
    let regex

    switch (type) {
      case 'uppercase':
        regex = /[A-Z]/
        return regex.test(text)
      case 'lowercase':
        regex = /[a-z]/
        return regex.test(text)
      case 'specialChars':
        regex = /\W/
        return regex.test(text)
      case 'number':
        regex = /\d/
        return regex.test(text)
      case 'hasLenght':
        return text.length >= (length ?? 0)
      default:
        return false
    }
  }
}

export function checkAllPasswordsType(text: string) {
  const validations = [
    {
      message: 'Possuir números',
      isValid: checkPassword('number')(text),
    },
    {
      message: 'Possuir caractéres especiais',
      isValid: checkPassword('specialChars')(text),
    },
    {
      message: 'Possuir letras maiúsculas',
      isValid: checkPassword('uppercase')(text),
    },
    {
      message: 'Possuir letras minúsculas',
      isValid: checkPassword('lowercase')(text),
    },
    {
      message: 'Possuir pelo menos 6 dígitos',
      isValid: checkPassword('hasLenght')(text, 6),
    },
  ]

  const hasError = validations.some((item) => !item.isValid)

  return { validations, hasError }
}
