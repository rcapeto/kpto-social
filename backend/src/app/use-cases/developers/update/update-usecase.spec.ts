import { DevelopersInCacheDatabase } from '@test/cache-database/developers';
import { DevelopersUpdateUsecase } from './update-usecase';
import { ErrorMessage } from '~/app/models/ErrorMessage';

const repository = new DevelopersInCacheDatabase();
const usecase = new DevelopersUpdateUsecase(repository);

describe('Developers', () => {
  it('should be able to update developer', async () => {
    repository.populateDB();

    const developerId = 'test-0';
    const name = 'John Doe';

    const { developer } = await usecase.execute({
      developerId,
      params: { name },
    });

    expect(developer?.name).toBe(name);
  });

  it('should not be able to update developer data', async () => {
    repository.populateDB();

    const developerId = 'wrong-id';
    const name = 'John Doe';

    expect(() => {
      return usecase.execute({
        developerId,
        params: { name },
      });
    }).rejects.toBe(ErrorMessage);
  });
});
