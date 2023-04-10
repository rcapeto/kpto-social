import { RegisterSchema } from '~/validation/account/register';

export type AccountRepositoryRegisterParams = RegisterSchema;

export abstract class AccountRepository {
  register: (params: AccountRepositoryRegisterParams) => Promise<void>;
}
