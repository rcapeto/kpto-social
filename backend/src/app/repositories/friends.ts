import {
  FriendshipSchema,
  FriendshipFindManySchema,
} from '~/validation/friends';
import { DeveloperEntity } from '../models/entity/developer';

export type FriendsRepositoryToggleParams = FriendshipSchema;
export type FriendsRepositoryToggleResponse = Promise<void>;
export type FriendsRepositoryFindManyParams = FriendshipFindManySchema;
export type FriendsRepositoryFindManyResponse = Promise<{
  friends: DeveloperEntity[];
  perPage: number;
  page: number;
  search: string;
  count: number;
}>;

export abstract class FriendsRepository {
  addFriendship: (
    params: FriendsRepositoryToggleParams,
  ) => FriendsRepositoryToggleResponse;
  removeFriendship: (
    params: FriendsRepositoryToggleParams,
  ) => FriendsRepositoryToggleResponse;
  findMany: (
    params: FriendsRepositoryFindManyParams,
  ) => FriendsRepositoryFindManyResponse;
}
