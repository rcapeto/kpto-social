import { CommentsFindManyController } from '~/app/controllers/comments/findMany';
import { CommentsPrismaRepository } from '~/app/database/comments';
import { CommentsFindManyUsecase } from '~/app/use-cases/comments/findMany/findMany-usecase';

const repository = new CommentsPrismaRepository();
const usecase = new CommentsFindManyUsecase(repository);
const controller = new CommentsFindManyController(usecase);

export const findManyComments = controller.handler.bind(controller);
