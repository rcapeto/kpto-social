import { PostsCommentsController } from '~/app/controllers/posts/comments';
import { PostsPrismaRepository } from '~/app/database/posts';
import { PostsCommentsUsecase } from '~/app/use-cases/posts/comments/comments-usecase';

const repository = new PostsPrismaRepository();
const usecase = new PostsCommentsUsecase(repository);
const controller = new PostsCommentsController(usecase);

export const getPostComments = controller.handler.bind(controller);
