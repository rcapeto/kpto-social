import { ApiResponse } from '@http/types/http'
import { HTTPErrorEnum } from '@http/enums/errors'
import { httpMessages } from '@http/constants/messages'
import {} from '@http/routes/account'

export class Http {
  private static INSTANCE: Http

  private constructor() {
    console.log('>>> Create: [HTTP library]')
  }

  public static getInstance() {
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
