import { Router } from 'express';

import { serverConfig } from '@config/server';

import { ensureDeveloperIsAuthenticate } from '~/middlewares/ensureDeveloperIsAuthenticated';
import { likesFindMany } from './findMany';

const route = Router();
const routes = serverConfig.routes.likes;

route.get(routes.findMany, ensureDeveloperIsAuthenticate, likesFindMany);

export { route as likesRoute };
