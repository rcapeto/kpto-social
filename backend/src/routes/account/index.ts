import { Router } from 'express';

import { serverConfig } from '@config/server';
import { registerDeveloper } from '~/routes/account/register';

const route = Router();

route.post(serverConfig.routes.account.register, registerDeveloper);

export { route as accountRoute };
