import { LoginSchema } from '~/validation/account/login';
import { RegisterSchema } from '~/validation/account/register';

export type AccountRepositoryRegisterParams = RegisterSchema;
export type AccountRepositoryRegisterResponse = Promise<void>;
export type AccountRepositoryLoginParams = LoginSchema;
export type AccountRepositoryLoginResponse = Promise<{
  token: string;
}>;

export abstract class AccountRepository {
  register: (
    params: AccountRepositoryRegisterParams,
  ) => AccountRepositoryRegisterResponse;
  login: (
    params: AccountRepositoryLoginParams,
  ) => AccountRepositoryLoginResponse;
}
