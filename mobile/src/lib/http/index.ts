import * as account from '@http/routes/account'
import * as posts from '@http/routes/posts'

class Http {
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

  getPostRoutes() {
    return {
      findMany: posts.findMany,
      findOne: posts.findOne,
    }
  }
  // developers() {}
  // comments() {}
  // posts() {}
  // likes() {}
}

export const http = Http.getInstance()
