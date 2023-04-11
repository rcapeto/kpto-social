import {
  FriendsRepository,
  FriendsRepositoryFindManyParams,
  FriendsRepositoryFindManyResponse,
} from '~/app/repositories/friends';

type Request = FriendsRepositoryFindManyParams;
type Response = FriendsRepositoryFindManyResponse;

export class FriendsFindManyUsecase {
  constructor(private repository: FriendsRepository) {}

  async execute(request: Request): Response {
    const defaultParams: Partial<Request> = {
      page: 1,
      perPage: 10,
      search: '',
    };

    const params = Object.assign(defaultParams, request);
    const response = await this.repository.findMany(params);

    return response;
  }
}
