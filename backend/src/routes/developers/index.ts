import { Router } from 'express';

import { serverConfig } from '@config/server';
import { findOneDeveloper } from '~/routes/developers/findOne';
import { me } from '~/routes/developers/me';
import { findManyDevelopers } from '~/routes/developers/findMany';

import { ensureDeveloperIsAuthenticate } from '~/middlewares/ensureDeveloperIsAuthenticated';

const route = Router();
const routes = serverConfig.routes.developers;

route.get(routes.findOne, ensureDeveloperIsAuthenticate, findOneDeveloper);
route.get(routes.me, ensureDeveloperIsAuthenticate, me);
route.get(routes.findMany, ensureDeveloperIsAuthenticate, findManyDevelopers);

export { route as developersRoutes };
