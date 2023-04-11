import { FriendsFindManyController } from '~/app/controllers/friends/findMany';
import { FriendsPrismaRepository } from '~/app/database/friends';
import { FriendsFindManyUsecase } from '~/app/use-cases/friends/findMany/findMany-usecase';

const repository = new FriendsPrismaRepository();
const usecase = new FriendsFindManyUsecase(repository);
const controller = new FriendsFindManyController(usecase);

export const friendsFindMany = controller.handler.bind(controller);
