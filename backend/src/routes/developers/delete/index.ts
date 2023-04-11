import { DevelopersDeleteController } from '~/app/controllers/developers/delete';
import { DevelopersPrismaRepository } from '~/app/database/developers';
import { DevelopersDeleteUsecase } from '~/app/use-cases/developers/delete/delete-usecase';

const repository = new DevelopersPrismaRepository();
const usecase = new DevelopersDeleteUsecase(repository);
const controller = new DevelopersDeleteController(usecase);

export const deleteDeveloper = controller.handler.bind(controller);
