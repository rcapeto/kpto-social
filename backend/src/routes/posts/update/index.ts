import { PostsUpdateController } from '~/app/controllers/posts/update';
import { PostsPrismaRepository } from '~/app/database/posts';
import { PostsUpdateUsecase } from '~/app/use-cases/posts/update/update-usecase';

const repository = new PostsPrismaRepository();
const usecase = new PostsUpdateUsecase(repository);
const controller = new PostsUpdateController(usecase);

export const updatePost = controller.handler.bind(controller);
