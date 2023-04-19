import * as account from '@http/routes/account'

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

  getAccountRoutes() {
    return {
      login: account.login,
      me: account.me,
      register: account.register,
    }
  }
  // developers() {}
  // comments() {}
  // posts() {}
  // likes() {}
}

export const http = Http.getInstance()
