import { FriendsRemoveController } from '~/app/controllers/friends/remove';
import { FriendsPrismaRepository } from '~/app/database/friends';
import { FriendsRemoveUsecase } from '~/app/use-cases/friends/remove/remove-usecase';

const repository = new FriendsPrismaRepository();
const usecase = new FriendsRemoveUsecase(repository);
const controller = new FriendsRemoveController(usecase);

export const removeFriend = controller.handler.bind(controller);
