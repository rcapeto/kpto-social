import { DevelopersInCacheDatabase } from '@test/cache-database/developers';
import { DevelopersDeleteUsecase } from './delete-usecase';
import { makeDeveloper } from '@test/factory/developer';
import { ErrorMessage } from '~/app/models/ErrorMessage';

const repository = new DevelopersInCacheDatabase();
const usecase = new DevelopersDeleteUsecase(repository);

describe('Developers', () => {
  it('should be able to delete developer', async () => {
    const developerId = 'test-0';
    repository.populateDB();

    await usecase.execute({ developerId });

    expect(() => {
      return repository.findOne({ developerId });
    }).rejects.toBe(ErrorMessage);
  });
});
