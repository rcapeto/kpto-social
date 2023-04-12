import { Router } from 'express';

import { serverConfig } from '@config/server';

import { ensureDeveloperIsAuthenticate } from '~/middlewares/ensureDeveloperIsAuthenticated';
import { likesFindMany } from './findMany';
import { checkLike } from './check';

const route = Router();
const routes = serverConfig.routes.likes;

route.get(routes.findMany, ensureDeveloperIsAuthenticate, likesFindMany);
route.get(routes.check, ensureDeveloperIsAuthenticate, checkLike);

export { route as likesRoute };
