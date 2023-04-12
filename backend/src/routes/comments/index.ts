import { Router } from 'express';

import { serverConfig } from '@config/server';
import { ensureDeveloperIsAuthenticate } from '~/middlewares/ensureDeveloperIsAuthenticated';
import { findManyComments } from './findMany';

const route = Router();
const routes = serverConfig.routes.comments;

route.get(routes.findMany, ensureDeveloperIsAuthenticate, findManyComments);

export { route as commentsRoute };
