import { CommentsDeleteController } from '~/app/controllers/comments/delete';
import { CommentsPrismaRepository } from '~/app/database/comments';
import { CommentsDeleteUsecase } from '~/app/use-cases/comments/delete/delete-usecase';

const repository = new CommentsPrismaRepository();
const usecase = new CommentsDeleteUsecase(repository);
const controller = new CommentsDeleteController(usecase);

export const deleteComment = controller.handler.bind(controller);
