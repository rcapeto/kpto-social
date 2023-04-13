import { LikesCheckController } from '~/app/controllers/likes/check';
import { LikesPrismaRepository } from '~/app/database/likes';
import { LikesCheckUsecase } from '~/app/use-cases/likes/check/check-usecase';

const repository = new LikesPrismaRepository();
const usecase = new LikesCheckUsecase(repository);
const controller = new LikesCheckController(usecase);

export const checkLike = controller.handler.bind(controller);
