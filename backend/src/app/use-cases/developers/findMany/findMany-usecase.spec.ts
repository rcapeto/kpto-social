import { DevelopersInCacheDatabase } from '@test/cache-database/developers';
import { DevelopersFindManyUsecase } from './findMany-usecase';
import { ErrorMessage } from '~/app/models/ErrorMessage';

const repository = new DevelopersInCacheDatabase();
const usecase = new DevelopersFindManyUsecase(repository);

describe('Developers', () => {
  it('should be able to find 10 developers', async () => {
    const { developers, page, perPage } = await usecase.execute({
      perPage: 2,
      search: '0',
    });

    expect((developers ?? []).length).toBe(1);
    expect(perPage).toBeTruthy();
    expect(page).toBeTruthy();
  });
});
