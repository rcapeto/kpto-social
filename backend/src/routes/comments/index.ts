import { Router } from 'express';

import { serverConfig } from '@config/server';
import { ensureDeveloperIsAuthenticate } from '~/middlewares/ensureDeveloperIsAuthenticated';

import { findManyComments } from '~/routes/comments/findMany';
import { deleteComment } from '~/routes/comments/delete';
import { createComment } from '~/routes/comments/create';

const route = Router();
const routes = serverConfig.routes.comments;

route.get(routes.findMany, ensureDeveloperIsAuthenticate, findManyComments);
route.delete(routes.delete, ensureDeveloperIsAuthenticate, deleteComment);
route.post(routes.create, ensureDeveloperIsAuthenticate, createComment);

export { route as commentsRoute };
