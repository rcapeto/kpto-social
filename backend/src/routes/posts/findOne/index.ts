import { PostsFindOneController } from '~/app/controllers/posts/findOne';
import { PostsPrismaRepository } from '~/app/database/posts';
import { PostsFindOneUsecase } from '~/app/use-cases/posts/findOne/findOne-usecase';

const repository = new PostsPrismaRepository();
const usecase = new PostsFindOneUsecase(repository);
const controller = new PostsFindOneController(usecase);

export const findOnePost = controller.handler.bind(controller);
