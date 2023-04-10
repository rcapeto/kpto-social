import { DeveloperEntity } from '~/app/models/entity/developer';
import {
  AccountRepository,
  AccountRepositoryRegisterParams,
  AccountRepositoryLoginParams,
  AccountRepositoryLoginResponse,
} from '~/app/repositories/account';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';
import { registerSchema } from '~/validation/account/register';
import { makeDeveloper } from '@test/factory/developer';
import { loginSchema } from '~/validation/account/login';
import { createToken } from '~/utils/token';
import { getControllerError } from '~/utils/getControllerError';

export class AccountInCacheDatabase implements AccountRepository {
  private developers: DeveloperEntity[];

  constructor() {
    this.developers = [];
  }

  count() {
    return this.developers.length;
  }

  async register(params: AccountRepositoryRegisterParams) {
    try {
      const { github, name, password } = registerSchema.parse(params);
      const developer = makeDeveloper({ name, github, password });

      this.developers.push(developer);
    } catch (error) {
      const { error: errorMessage } = getControllerError(error);
      throw errorMessage;
    }
  }

  async login(
    params: AccountRepositoryLoginParams,
  ): AccountRepositoryLoginResponse {
    try {
      const { github, password } = loginSchema.parse(params);
      const developer = this.findOne(github);

      if (!developer) {
        throw new ErrorMessage(
          'Developer not found, please register',
          ErrorMessageCause.VALIDATION,
        );
      }

      if (developer.password !== password) {
        throw new ErrorMessage(
          'Please verify the username or password, something is incorrect',
          ErrorMessageCause.VALIDATION,
        );
      }

      const token = createToken({
        developerId: developer.id,
        github: developer.github,
      });

      return { token };
    } catch (error) {
      const { error: errorMessage } = getControllerError(error);
      throw errorMessage;
    }
  }

  findOne(github: string) {
    const developer = this.developers.find((dev) => dev.github === github);
    return developer;
  }
}
