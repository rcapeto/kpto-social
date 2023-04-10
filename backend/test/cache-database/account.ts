import { DeveloperEntity } from '~/app/models/entity/developer';
import {
  AccountRepository,
  AccountRepositoryRegisterParams,
} from '~/app/repositories/account';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';
import { getZodError } from '~/utils/getZodError';
import { registerSchema } from '~/validation/account/register';
import { makeDeveloper } from '@test/factory/developer';

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
      const { isZodError, message } = getZodError(error);
      const cause = isZodError
        ? ErrorMessageCause.VALIDATION
        : ErrorMessageCause.ERROR;
      throw new ErrorMessage(message, cause);
    }
  }
}
