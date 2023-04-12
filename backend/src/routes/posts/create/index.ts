import { PostsCreateController } from '~/app/controllers/posts/create';
import { PostsPrismaRepository } from '~/app/database/posts';
import { PostsCreateUsecase } from '~/app/use-cases/posts/create/create-usecase';

const repository = new PostsPrismaRepository();
const usecase = new PostsCreateUsecase(repository);
const controller = new PostsCreateController(usecase);

export const createPost = controller.handler.bind(controller);
