import { encryptPassword, checkPassword } from '~/utils/password';
import {
  AccountRepository,
  AccountRepositoryRegisterParams,
  AccountRepositoryLoginParams,
  AccountRepositoryLoginResponse,
} from '~/app/repositories/account';
import { client } from '~/service/prisma';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';
import { getErrorMessage } from '~/utils/getErrorMessage';
import { createToken } from '~/utils/token';
import { messages } from '@config/messages';

export class AccountPrismaRepository implements AccountRepository {
  async login(
    params: AccountRepositoryLoginParams,
  ): AccountRepositoryLoginResponse {
    try {
      const { github, password } = params;

      const developer = await this.findOneDeveloperByGithub(github);

      const isCorrectPassword = await checkPassword({
        password,
        encryptedPassword: developer.password,
      });

      if (!isCorrectPassword) {
        throw new ErrorMessage(
          messages.WRONG_PASSWORD,
          ErrorMessageCause.VALIDATION,
        );
      }

      const developerId = developer.id;
      const token = createToken({ developerId, github });

      return { token };
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async register(params: AccountRepositoryRegisterParams) {
    try {
      const { confirm_password, github, name, password } = params;

      const developer = await this.findOneDeveloperByGithub(github);

      if (password !== confirm_password) {
        throw new ErrorMessage(
          messages.WRONG_PASSWORD,
          ErrorMessageCause.VALIDATION,
        );
      }

      if (developer) {
        throw new ErrorMessage(
          messages.DEVELOPER_ALREADY_EXISTS,
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

  async findOneDeveloperByGithub(github: string) {
    const [developer] = await client.developers.findMany({
      where: {
        github,
      },
    });

    if (!developer) {
      throw new ErrorMessage(
        messages.NOT_FOUND_DEVELOPER,
        ErrorMessageCause.VALIDATION,
      );
    }

    return developer;
  }
}
