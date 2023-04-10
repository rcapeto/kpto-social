import { DevelopersInCacheDatabase } from '@test/cache-database/developers';
import { DevelopersFindOneUsecase } from './findOne-usecase';
import { ErrorMessage } from '~/app/models/ErrorMessage';

const repository = new DevelopersInCacheDatabase();
const usecase = new DevelopersFindOneUsecase(repository);

describe('Developers', () => {
  it('should be able to find a developer', async () => {
    const developerId = 'example-id';
    const github = 'example-github';

    const { developer } = await usecase.execute({ developerId });

    expect(developer).toBeTruthy();
    expect(developer).toEqual(
      expect.objectContaining({
        github,
      }),
    );
  });

  it('should not be able to find a developer', () => {
    expect(() => {
      return usecase.execute({ developerId: 'wrong-id' });
    }).rejects.toBe(ErrorMessage);
  });
});
