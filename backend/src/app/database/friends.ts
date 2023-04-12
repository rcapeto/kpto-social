import { client } from '~/service/prisma';
import {
  FriendsRepository,
  FriendsRepositoryToggleResponse,
  FriendsRepositoryToggleParams,
  FriendsRepositoryFindManyParams,
  FriendsRepositoryFindManyResponse,
} from '../repositories/friends';
import { getErrorMessage } from '~/utils/getErrorMessage';
import { ErrorMessage, ErrorMessageCause } from '../models/ErrorMessage';
import { DeveloperEntity } from '../models/entity/developer';

export class FriendsPrismaRepository implements FriendsRepository {
  async findMany(
    params: FriendsRepositoryFindManyParams,
  ): FriendsRepositoryFindManyResponse {
    try {
      const { developerId, page, search, perPage } = params;

      const developer = await this.findById(developerId);

      if (!developer) {
        throw new ErrorMessage(
          'To get a new friend, please register in application.',
          ErrorMessageCause.UNAUTHORIZED,
        );
      }

      const count = await this.countFriends(developerId);

      const developerFriends = await client.developers.findUnique({
        where: {
          id: developerId,
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
        friends: (developerFriends?.friends ?? []) as DeveloperEntity[],
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

      const developer = await this.findById(developerId);
      const user = await this.findById(userId);

      if (!developer) {
        throw new ErrorMessage(
          'To get a new friend, please register in application.',
          ErrorMessageCause.UNAUTHORIZED,
        );
      }

      if (!user) {
        throw new ErrorMessage(
          'The developer you want to be a friend does not exist',
          ErrorMessageCause.ERROR,
        );
      }

      await client.developers.update({
        where: {
          id: developerId,
        },
        data: {
          friends: {
            connect: [{ id: userId }],
          },
        },
      });

      await client.developers.update({
        where: {
          id: userId,
        },
        data: {
          friends: {
            connect: [{ id: developerId }],
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

      const developer = await this.findById(developerId);
      const user = await this.findById(userId);

      if (!developer) {
        throw new ErrorMessage(
          'To remove a friend, please register in application.',
          ErrorMessageCause.UNAUTHORIZED,
        );
      }

      if (!user) {
        throw new ErrorMessage(
          'The developer you want to remove a friendship does not exist',
          ErrorMessageCause.ERROR,
        );
      }

      await client.developers.update({
        where: {
          id: developerId,
        },
        data: {
          friends: {
            disconnect: [{ id: userId }],
          },
        },
      });

      await client.developers.update({
        where: {
          id: userId,
        },
        data: {
          friends: {
            disconnect: [{ id: developerId }],
          },
        },
      });
    } catch (err) {
      const error = getErrorMessage(err);
      throw error;
    }
  }

  async findById(developerId: string) {
    const developer = await client.developers.findUnique({
      where: {
        id: developerId,
      },
    });
    return developer;
  }

  async countFriends(developerId: string) {
    const data = await client.developers.findUnique({
      where: {
        id: developerId,
      },
      select: {
        friends: {
          select: {
            id: true,
          },
        },
      },
    });

    return data?.friends.length ?? 0;
  }
}
