import { Router } from 'express';

import { serverConfig } from '@config/server';
import { ensureDeveloperIsAuthenticate } from '~/middlewares/ensureDeveloperIsAuthenticated';

import { likesFindMany } from '~/routes/likes/findMany';
import { checkLike } from '~/routes/likes/check';
import { toggleLike } from '~/routes/likes/toggle';

const route = Router();
const routes = serverConfig.routes.likes;

route.get(routes.findMany, ensureDeveloperIsAuthenticate, likesFindMany);
route.get(routes.check, ensureDeveloperIsAuthenticate, checkLike);
route.post(routes.toggle, ensureDeveloperIsAuthenticate, toggleLike);

export { route as likesRoute };
