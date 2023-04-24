export function getErrorMessage(err: any, errorMessage?: string): string {
  const isError = err instanceof Error
  return isError ? err.message : errorMessage ?? ''
}
