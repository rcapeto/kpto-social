import { makeDeveloper } from '@test/factory/developer';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';
import { DeveloperEntity } from '~/app/models/entity/developer';
import {
  DevelopersRepository,
  DevelopersRepositoryDeleteParams,
  DevelopersRepositoryDeleteResponse,
  DevelopersRepositoryFindManyParams,
  DevelopersRepositoryFindManyResponse,
  DevelopersRepositoryFindOneParams,
  DevelopersRepositoryFindOneResponse,
  DevelopersRepositoryUpdateResponse,
  DevelopersUpdateParams,
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

  async findMany(
    params: DevelopersRepositoryFindManyParams,
  ): DevelopersRepositoryFindManyResponse {
    const { page, perPage, search } = params;

    this.populateDB();

    const start = (page - 1) * perPage;
    const end = perPage * page;

    const developers = this.developers
      .slice(start, end)
      .filter((dev) => dev.github.toLowerCase().includes(search.toLowerCase()));

    return {
      developers,
      perPage,
      page,
      search,
      count: this.developers.length,
    };
  }

  async delete(
    params: DevelopersRepositoryDeleteParams,
  ): DevelopersRepositoryDeleteResponse {
    const { developerId } = params;
    this.developers = this.developers.filter((dev) => dev.id !== developerId);
  }

  async update(
    developerId: string,
    params: DevelopersUpdateParams,
  ): DevelopersRepositoryUpdateResponse {
    const { avatar_url, name, password, techs } = params;

    const { developer } = await this.findOne({ developerId });

    if (developer) {
      developer.avatar_url = avatar_url || developer.avatar_url;
      developer.name = name || developer.name;
      developer.password = password || developer.password;
      developer.techs = techs || developer.techs;
    }

    return { developer };
  }

  populateDB() {
    for (let i = 0; i <= 20; i++) {
      const value = `test-${i}`;

      const developer = makeDeveloper({
        name: value,
        github: value,
        id: value,
      });

      this.developers.push(developer);
    }
  }
}
