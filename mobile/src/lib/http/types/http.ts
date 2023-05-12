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
interface MiddlewareParams<Response> {
  response: Response
  status: number
}

export interface HTTPConfig<Response = {}> {
  errorCallback?: HTTPErrorCallback
  unauthorizedCallback?: HTTPUnauthorizedCallback
  dispatchLoading?: HTTPCallback
  middleware?: (params?: MiddlewareParams<Response>) => void
}
