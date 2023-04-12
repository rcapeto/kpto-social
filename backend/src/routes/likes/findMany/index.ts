import { LikesFindManyController } from '~/app/controllers/likes/findMany';
import { LikesPrismaRepository } from '~/app/database/likes';
import { LikesFindManyUsecase } from '~/app/use-cases/likes/findMany/findMany-usecase';

const repository = new LikesPrismaRepository();
const usecase = new LikesFindManyUsecase(repository);
const controller = new LikesFindManyController(usecase);

export const likesFindMany = controller.handler.bind(controller);
