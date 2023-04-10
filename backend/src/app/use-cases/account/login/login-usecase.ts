import {
  AccountRepository,
  AccountRepositoryLoginResponse,
} from '~/app/repositories/account';
import { LoginSchema } from '~/validation/account/login';

type Request = LoginSchema;
type Response = Promise<AccountRepositoryLoginResponse>;

export class AccountLoginUsecase {
  constructor(private repository: AccountRepository) {}

  async execute(request: Request): Response {
    const response = await this.repository.login(request);
    return response;
  }
}
