import { getErrorMessage } from '~/utils/getErrorMessage';
import {
  DevelopersRepository,
  DevelopersRepositoryFindManyParams,
  DevelopersRepositoryFindManyResponse,
  DevelopersRepositoryFindOneParams,
  DevelopersRepositoryFindOneResponse,
} from '../repositories/developers';
import { client } from '~/service/prisma';
import { DeveloperEntity } from '../models/entity/developer';

export class DevelopersPrismaRepository implements DevelopersRepository {
  async findMany(
    params: DevelopersRepositoryFindManyParams,
  ): DevelopersRepositoryFindManyResponse {
    try {
      const { page, perPage, search } = params;
      const count = await client.developers.count();

      const developers = (await client.developers.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        where: {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              techs: {
                contains: search,
              },
            },
            {
              github: {
                contains: search,
              },
            },
          ],
        },
      })) as DeveloperEntity[];

      return {
        count,
        page,
        perPage,
        search,
        developers: developers as DeveloperEntity[],
      };
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

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
