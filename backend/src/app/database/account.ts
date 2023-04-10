import { encryptPassword } from '~/utils/password';
import {
  AccountRepository,
  AccountRepositoryRegisterParams,
} from '../repositories/account';
import { client } from '~/service/prisma';
import { ErrorMessage, ErrorMessageCause } from '../models/ErrorMessage';
import { getErrorMessage } from '~/utils/getErrorMessage';

export class AccountPrismaRepository implements AccountRepository {
  async register(params: AccountRepositoryRegisterParams) {
    try {
      const { confirm_password, github, name, password } = params;

      const hasDeveloper = await this.findOneWithGithub(github);

      if (password !== confirm_password) {
        throw new ErrorMessage(
          'Fill both password fields equally',
          ErrorMessageCause.VALIDATION,
        );
      }

      if (hasDeveloper) {
        throw new ErrorMessage(
          'There is already a developer with this github',
          ErrorMessageCause.ERROR,
        );
      }

      const passwordEncrypted = await encryptPassword({ password });

      await client.developers.create({
        data: {
          avatar_url: '',
          github,
          name,
          password: passwordEncrypted,
          techs: '',
        },
      });
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async findOneWithGithub(github: string) {
    const [developer] = await client.developers.findMany({
      where: {
        github,
      },
    });

    return Boolean(developer);
  }
}
