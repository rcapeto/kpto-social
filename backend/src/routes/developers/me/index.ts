import { DevelopersMeController } from '~/app/controllers/developers/me';
import { DevelopersPrismaRepository } from '~/app/database/developers';
import { DevelopersFindOneUsecase } from '~/app/use-cases/developers/findOne/findOne-usecase';

const repository = new DevelopersPrismaRepository();
const usecase = new DevelopersFindOneUsecase(repository);
const controller = new DevelopersMeController(usecase);

export const me = controller.handler.bind(controller);
