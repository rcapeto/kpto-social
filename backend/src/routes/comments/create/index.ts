import { CommentsCreateController } from '~/app/controllers/comments/create';
import { CommentsPrismaRepository } from '~/app/database/comments';
import { CommentsCreateUsecase } from '~/app/use-cases/comments/create/create-usecase';

const repository = new CommentsPrismaRepository();
const usecase = new CommentsCreateUsecase(repository);
const controller = new CommentsCreateController(usecase);

export const createComment = controller.handler.bind(controller);
