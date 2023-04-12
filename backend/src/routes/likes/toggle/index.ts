import { LikesToggleController } from '~/app/controllers/likes/toggle';
import { LikesPrismaRepository } from '~/app/database/likes';
import { LikesToggleUsecase } from '~/app/use-cases/likes/toggle/toggle-usecase';

const repository = new LikesPrismaRepository();
const usecase = new LikesToggleUsecase(repository);
const controller = new LikesToggleController(usecase);

export const toggleLike = controller.handler.bind(controller);
