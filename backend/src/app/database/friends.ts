import { client } from '~/service/prisma';
import {
  FriendsRepository,
  FriendsRepositoryToggleResponse,
  FriendsRepositoryToggleParams,
  FriendsRepositoryFindManyParams,
  FriendsRepositoryFindManyResponse,
} from '~/app/repositories/friends';
import { getErrorMessage } from '~/utils/getErrorMessage';
import { ErrorMessage, ErrorMessageCause } from '~/app/models/ErrorMessage';
import { DeveloperEntity } from '~/app/models/entity/developer';
import { messages } from '@config/messages';

export class FriendsPrismaRepository implements FriendsRepository {
  async findMany(
    params: FriendsRepositoryFindManyParams,
  ): FriendsRepositoryFindManyResponse {
    try {
      const { developerId, page, search, perPage } = params;

      const developer = await this.findDeveloperById(developerId);
      const count = await this.countFriends(developerId);

      const developerWithFriends = await client.developers.findUnique({
        where: {
          id: developer.id,
        },
        select: {
          friends: {
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
              avatar_url: true,
              createdAt: true,
              github: true,
              name: true,
              techs: true,
              id: true,
            },
          },
        },
      });

      return {
        perPage,
        count,
        search,
        friends: (developerWithFriends?.friends ?? []) as DeveloperEntity[],
        page,
      };
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async addFriendship(
    params: FriendsRepositoryToggleParams,
  ): FriendsRepositoryToggleResponse {
    try {
      const { developerId, userId } = params;

      const developer = await this.findDeveloperById(developerId);
      const user = await this.findDeveloperById(userId, true);

      await client.developers.update({
        where: {
          id: developer.id,
        },
        data: {
          friends: {
            connect: [{ id: user.id }],
          },
        },
      });

      await client.developers.update({
        where: {
          id: user.id,
        },
        data: {
          friends: {
            connect: [{ id: developer.id }],
          },
        },
      });
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async removeFriendship(
    params: FriendsRepositoryToggleParams,
  ): FriendsRepositoryToggleResponse {
    try {
      const { developerId, userId } = params;

      const developer = await this.findDeveloperById(developerId);
      const user = await this.findDeveloperById(userId, true);

      await client.developers.update({
        where: {
          id: developer.id,
        },
        data: {
          friends: {
            disconnect: [{ id: user.id }],
          },
        },
      });

      await client.developers.update({
        where: {
          id: user.id,
        },
        data: {
          friends: {
            disconnect: [{ id: developer.id }],
          },
        },
      });
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async findDeveloperById(developerId: string, isFriend?: boolean) {
    const developer = await client.developers.findUnique({
      where: {
        id: developerId,
      },
      select: {
        id: true,
        friends: true,
      },
    });

    if (!developer) {
      const message =
        messages[
          isFriend ? 'NOT_FOUND_DEVELOPER_FRIEND' : 'NOT_FOUND_DEVELOPER'
        ];
      throw new ErrorMessage(message, ErrorMessageCause.UNAUTHORIZED);
    }

    return developer;
  }

  async countFriends(developerId: string) {
    const data = await client.developers.findUnique({
      where: {
        id: developerId,
      },
      select: {
        _count: true,
      },
    });

    return data?._count?.friends ?? 0;
  }
}
