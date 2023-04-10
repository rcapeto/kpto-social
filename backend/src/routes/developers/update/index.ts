import { DevelopersUpdateController } from '~/app/controllers/developers/update';
import { DevelopersPrismaRepository } from '~/app/database/developers';
import { DevelopersUpdateUsecase } from '~/app/use-cases/developers/update/update-usecase';

const repository = new DevelopersPrismaRepository();
const usecase = new DevelopersUpdateUsecase(repository);
const controller = new DevelopersUpdateController(usecase);

export const updateDeveloper = controller.handler.bind(controller);
