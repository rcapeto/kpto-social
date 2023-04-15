import { PostsFindManyDeveloperController } from '~/app/controllers/posts/findManyDeveloper';
import { PostsPrismaRepository } from '~/app/database/posts';
import { PostsFindManyDeveloperUsecase } from '~/app/use-cases/posts/findManyDeveloper/findManyDeveloper-usecase';

const repository = new PostsPrismaRepository();
const usecase = new PostsFindManyDeveloperUsecase(repository);
const controller = new PostsFindManyDeveloperController(usecase);

export const findManyDeveloperPosts = controller.handler.bind(controller);
