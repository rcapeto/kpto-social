import { getErrorMessage } from '~/utils/getErrorMessage';
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
import { client } from '~/service/prisma';
import { DeveloperEntity } from '../models/entity/developer';
import { checkPassword, encryptPassword } from '~/utils/password';
import { ErrorMessage, ErrorMessageCause } from '../models/ErrorMessage';

export class DevelopersPrismaRepository implements DevelopersRepository {
  async delete(
    params: DevelopersRepositoryDeleteParams,
  ): DevelopersRepositoryDeleteResponse {
    try {
      const { developerId } = params;

      const { developer } = await this.findOne({ developerId });

      if (!developer) {
        return;
      }

      await client.developers.delete({
        where: {
          id: developerId,
        },
      });
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

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
        select: {
          _count: true,
          avatar_url: true,
          createdAt: true,
          github: true,
          id: true,
          name: true,
          techs: true,
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
      select: {
        _count: true,
        avatar_url: true,
        createdAt: true,
        github: true,
        id: true,
        name: true,
        techs: true,
        password: true,
        posts: {
          take: 5,
          select: {
            title: true,
            thumbnail: true,
            _count: true,
          },
        },
      },
    });
    return developer;
  }

  async update(
    developerId: string,
    params: DevelopersUpdateParams,
  ): DevelopersRepositoryUpdateResponse {
    try {
      const { avatar_url, name, password, techs } = params;

      const fields: DevelopersUpdateParams = {
        avatar_url,
        name,
        password,
        techs,
      };

      const developer = await this.findOneById(developerId);

      if (!developer) {
        throw new ErrorMessage(
          'Developer not found, please register',
          ErrorMessageCause.VALIDATION,
        );
      }

      if (password) {
        const isSamePassword = await checkPassword({
          password,
          encryptedPassword: developer.password,
        });

        if (isSamePassword) {
          throw new ErrorMessage(
            'You can not use the same password',
            ErrorMessageCause.VALIDATION,
          );
        }

        fields.password = await encryptPassword({ password });
      }

      const updatedDeveloper = await client.developers.update({
        where: {
          id: developerId,
        },
        data: {
          avatar_url: fields.avatar_url || developer.avatar_url,
          name: fields.name || developer.name,
          techs: fields.techs || developer.techs,
          password: fields.password || developer.password,
        },
      });

      return {
        developer: updatedDeveloper as DeveloperEntity,
      };
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }
}
