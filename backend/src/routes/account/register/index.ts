import { AccountRegisterController } from '~/app/controllers/account/register';
import { AccountPrismaRepository } from '~/app/database/account';
import { AccountRegisterUsecase } from '~/app/use-cases/account/register/register-usecase';

const repository = new AccountPrismaRepository();
const usecase = new AccountRegisterUsecase(repository);
const controller = new AccountRegisterController(usecase);

export const registerDeveloper = controller.handler.bind(controller);
