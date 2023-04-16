import { ApiResponse } from '@http/types/http'
import { HTTPErrorEnum } from '@http/enums/errors'
import { httpMessages } from '@http/constants/messages'

class Http {
  private static INSTANCE: Http

  private contructor() {}

  public static getInstance(): Http {
    if (!this.INSTANCE) {
      this.INSTANCE = new Http()
    }

    return this.INSTANCE
  }

  security(response: ApiResponse) {
    const isError = Boolean(response?.data?.error)
    const isUnauthorized = Boolean(
      response?.data?.cause === HTTPErrorEnum.UNAUTHORIZED,
    )

    if (isError && isUnauthorized) {
      const message = httpMessages.errors.unauthorized
      throw new Error(message)
    }
  }

  account() {}

  developers() {}

  comments() {}

  posts() {}

  likes() {}
}

export const http = Http.getInstance()
