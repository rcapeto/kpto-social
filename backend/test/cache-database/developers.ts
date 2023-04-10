import { makeDeveloper } from '@test/factory/developer';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';
import { DeveloperEntity } from '~/app/models/entity/developer';
import {
  DevelopersRepository,
  DevelopersRepositoryFindOneParams,
  DevelopersRepositoryFindOneResponse,
} from '~/app/repositories/developers';
import { getControllerError } from '~/utils/getControllerError';
import { findOneDeveloperSchema } from '~/validation/developers/findOne';

export class DevelopersInCacheDatabase implements DevelopersRepository {
  private developers: DeveloperEntity[];

  constructor() {
    const developer = makeDeveloper({
      name: 'Example-name',
      password: 'example-password-123',
      github: 'example-github',
      id: 'example-id',
    });
    this.developers = [developer];
  }

  async findOne(
    params: DevelopersRepositoryFindOneParams,
  ): DevelopersRepositoryFindOneResponse {
    try {
      const { developerId } = findOneDeveloperSchema.parse(params);
      const developer = this.developers.find((dev) => dev.id === developerId);

      if (!developer) {
        throw new ErrorMessage(
          'Developer not found, please register',
          ErrorMessageCause.VALIDATION,
        );
      }

      return { developer };
    } catch (error) {
      const { error: errorMessage } = getControllerError(error);
      throw errorMessage;
    }
  }
}
