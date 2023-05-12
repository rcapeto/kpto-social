export function first<Type>(array: Type[]): Type | undefined {
  const isArray = Array.isArray(array)

  if (!isArray) {
    return undefined
  }

  return array?.[0]
}
