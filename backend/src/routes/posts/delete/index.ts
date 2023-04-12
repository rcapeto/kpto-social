import { PostsDeleteController } from '~/app/controllers/posts/delete';
import { PostsPrismaRepository } from '~/app/database/posts';
import { PostsDeleteUsecase } from '~/app/use-cases/posts/delete/delete-usecase';

const repository = new PostsPrismaRepository();
const usecase = new PostsDeleteUsecase(repository);
const controller = new PostsDeleteController(usecase);

export const deletePost = controller.handler.bind(controller);
