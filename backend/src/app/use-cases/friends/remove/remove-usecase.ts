import {
  FriendsRepository,
  FriendsRepositoryToggleParams,
  FriendsRepositoryToggleResponse,
} from '~/app/repositories/friends';

type Request = FriendsRepositoryToggleParams;
type Response = FriendsRepositoryToggleResponse;

export class FriendsRemoveUsecase {
  constructor(private repository: FriendsRepository) {}

  async execute(request: Request): Response {
    await this.repository.removeFriendship(request);
  }
}
