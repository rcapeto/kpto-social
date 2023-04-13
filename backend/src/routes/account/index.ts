import { Router } from 'express';

import { serverConfig } from '@config/server';

import { registerDeveloper } from '~/routes/account/register';
import { loginDeveloper } from '~/routes/account/login';

const route = Router();
const routes = serverConfig.routes.account;

route.post(routes.register, registerDeveloper);
route.get(routes.login, loginDeveloper);

export { route as accountRoute };
