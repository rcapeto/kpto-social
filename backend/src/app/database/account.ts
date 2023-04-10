import { encryptPassword, checkPassword } from '~/utils/password';
import {
  AccountRepository,
  AccountRepositoryRegisterParams,
  AccountRepositoryLoginParams,
  AccountRepositoryLoginResponse,
} from '../repositories/account';
import { client } from '~/service/prisma';
import { ErrorMessage, ErrorMessageCause } from '../models/ErrorMessage';
import { getErrorMessage } from '~/utils/getErrorMessage';
import { createToken } from '~/utils/token';

export class AccountPrismaRepository implements AccountRepository {
  async login(
    params: AccountRepositoryLoginParams,
  ): AccountRepositoryLoginResponse {
    try {
      const { github, password } = params;

      const developer = await this.findOneWithGithub(github);

      if (!developer) {
        throw new ErrorMessage(
          'Developer not found, please register',
          ErrorMessageCause.VALIDATION,
        );
      }

      const isCorrectPassword = await checkPassword({
        password,
        encryptedPassword: developer.password,
      });

      if (!isCorrectPassword) {
        throw new ErrorMessage(
          'Please verify the username or password, something is incorrect',
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

      const developer = await this.findOneWithGithub(github);

      if (password !== confirm_password) {
        throw new ErrorMessage(
          'Fill both password fields equally',
          ErrorMessageCause.VALIDATION,
        );
      }

      if (developer) {
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
    return developer;
  }
}
