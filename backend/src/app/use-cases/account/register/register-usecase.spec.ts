import { AccountInCacheDatabase } from '@test/cache-database/account';
import { AccountRegisterUsecase } from './register-usecase';
import { ErrorMessage } from '~/app/models/ErrorMessage';

const repository = new AccountInCacheDatabase();
const usecase = new AccountRegisterUsecase(repository);

describe('Account Register', () => {
  it('should be able to create a new developer', async () => {
    await usecase.execute({
      confirm_password: '@Password123',
      password: '@Password123',
      github: 'johndoe',
      name: 'John Doe',
    });

    const dbCount = repository.count();
    expect(dbCount).toBe(1);
  });

  it('should be not be able to create a new developer', () => {
    expect(() => {
      return usecase.execute({
        confirm_password: '',
        password: '@Password123',
        github: 'johndoe',
        name: '',
      });
    }).rejects.toBe(ErrorMessage);
  });
});
