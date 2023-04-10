import { AccountRepository } from '~/app/repositories/account';
import { RegisterSchema } from '~/validation/account/register';

type Request = RegisterSchema;
type Response = Promise<void>;

export class AccountRegisterUsecase {
  constructor(private repository: AccountRepository) {}

  async execute(request: Request): Response {
    await this.repository.register(request);
  }
}
