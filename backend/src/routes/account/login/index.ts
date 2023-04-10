import { AccountLoginController } from '~/app/controllers/account/login';
import { AccountPrismaRepository } from '~/app/database/account';
import { AccountLoginUsecase } from '~/app/use-cases/account/login/login-usecase';

const repository = new AccountPrismaRepository();
const usecase = new AccountLoginUsecase(repository);
const controller = new AccountLoginController(usecase);

export const loginDeveloper = controller.handler.bind(controller);
