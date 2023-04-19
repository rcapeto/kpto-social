export type ApiResponse<Type = object> = {
  data: Partial<ErrorResponse & Type>
}

export interface ErrorResponse {
  error: boolean
  message: string
  cause: string
}

export type HTTPErrorCallback = (errorMessage?: string) => void
export type HTTPCallback = () => void
export type HTTPUnauthorizedCallback = () => void

export interface HTTPConfig {
  errorCallback?: HTTPErrorCallback
  unauthorizedCallback?: HTTPUnauthorizedCallback
  dispatchLoading?: HTTPCallback
}
