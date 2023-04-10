import { getErrorMessage } from '~/utils/getErrorMessage';
import {
  DevelopersRepository,
  DevelopersRepositoryFindOneParams,
  DevelopersRepositoryFindOneResponse,
} from '../repositories/developers';
import { client } from '~/service/prisma';
import { DeveloperEntity } from '../models/entity/developer';

export class DevelopersPrismaRepository implements DevelopersRepository {
  async findOne(
    params: DevelopersRepositoryFindOneParams,
  ): DevelopersRepositoryFindOneResponse {
    try {
      const { developerId } = params;

      const developer = await this.findOneById(developerId);

      return {
        developer: developer as DeveloperEntity,
      };
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async findOneById(developerId: string) {
    const developer = await client.developers.findUnique({
      where: {
        id: developerId,
      },
    });
    return developer;
  }
}
