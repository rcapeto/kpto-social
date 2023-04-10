import { AccountInCacheDatabase } from '@test/cache-database/account';
import { AccountLoginUsecase } from './login-usecase';
import { ErrorMessage } from '~/app/models/ErrorMessage';
import { makeDeveloper } from '@test/factory/developer';

const repository = new AccountInCacheDatabase();
const usecase = new AccountLoginUsecase(repository);

const developer = makeDeveloper({
  name: 'Test User',
  password: 'password123',
  github: 'testexample',
});

describe('Account Login', () => {
  it('should be able to developer sign in', async () => {
    await repository.register({
      confirm_password: developer.password,
      github: developer.github,
      name: developer.name,
      password: developer.password,
    });

    const { token } = await usecase.execute({
      github: developer.github,
      password: developer.password,
    });

    expect(token).toBeTruthy();
  });

  it('should be not able to login in application - not found user', async () => {
    await repository.register({
      confirm_password: developer.password,
      github: developer.github,
      name: developer.name,
      password: developer.password,
    });

    expect(() => {
      return usecase.execute({
        github: 'test',
        password: developer.password,
      });
    }).rejects.toBe(ErrorMessage);
  });

  it('should be not able to login in application - wrong password or github', async () => {
    await repository.register({
      confirm_password: developer.password,
      github: developer.github,
      name: developer.name,
      password: developer.password,
    });

    expect(() => {
      return usecase.execute({
        github: developer.github,
        password: 'wrong-password',
      });
    }).rejects.toBe(ErrorMessage);
  });
});
