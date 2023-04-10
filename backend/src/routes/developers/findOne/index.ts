import { DevelopersFindOneController } from '~/app/controllers/developers/findOne';
import { DevelopersPrismaRepository } from '~/app/database/developers';
import { DevelopersFindOneUsecase } from '~/app/use-cases/developers/findOne/findOne-usecase';

const repository = new DevelopersPrismaRepository();
const usecase = new DevelopersFindOneUsecase(repository);
const controller = new DevelopersFindOneController(usecase);

export const findOneDeveloper = controller.handler.bind(controller);
