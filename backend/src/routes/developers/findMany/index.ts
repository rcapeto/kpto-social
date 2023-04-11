import { DevelopersFindManyController } from '~/app/controllers/developers/findMany';
import { DevelopersPrismaRepository } from '~/app/database/developers';
import { DevelopersFindManyUsecase } from '~/app/use-cases/developers/findMany/findMany-usecase';

const repository = new DevelopersPrismaRepository();
const usecase = new DevelopersFindManyUsecase(repository);
const controller = new DevelopersFindManyController(usecase);

export const findManyDevelopers = controller.handler.bind(controller);
