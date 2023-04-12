import { PostsFindManyController } from '~/app/controllers/posts/findMany';
import { PostsPrismaRepository } from '~/app/database/posts';
import { PostsFindManyUsecase } from '~/app/use-cases/posts/findMany/findMany-usecase';

const repository = new PostsPrismaRepository();
const usecase = new PostsFindManyUsecase(repository);
const controller = new PostsFindManyController(usecase);

export const findManyPosts = controller.handler.bind(controller);
