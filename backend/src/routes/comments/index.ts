import { Router } from 'express';

import { serverConfig } from '@config/server';
import { ensureDeveloperIsAuthenticate } from '~/middlewares/ensureDeveloperIsAuthenticated';

import { findManyComments } from './findMany';
import { deleteComment } from './delete';
import { createComment } from './create';

const route = Router();
const routes = serverConfig.routes.comments;

route.get(routes.findMany, ensureDeveloperIsAuthenticate, findManyComments);
route.delete(routes.delete, ensureDeveloperIsAuthenticate, deleteComment);
route.post(routes.create, ensureDeveloperIsAuthenticate, createComment);

export { route as commentsRoute };
