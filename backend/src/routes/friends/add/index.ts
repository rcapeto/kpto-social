import { FriendsAddController } from '~/app/controllers/friends/add';
import { FriendsPrismaRepository } from '~/app/database/friends';
import { FriendsAddUsecase } from '~/app/use-cases/friends/add/add-usecase';

const repository = new FriendsPrismaRepository();
const usecase = new FriendsAddUsecase(repository);
const controller = new FriendsAddController(usecase);

export const addFriend = controller.handler.bind(controller);
