import { Router } from 'express';

import { serverConfig } from '@config/server';
import { registerDeveloper } from '~/routes/account/register';
import { loginDeveloper } from '~/routes/account/login';

const route = Router();

route.post(serverConfig.routes.account.register, registerDeveloper);
route.post(serverConfig.routes.account.login, loginDeveloper);

export { route as accountRoute };
