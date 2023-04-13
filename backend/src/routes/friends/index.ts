import { Router } from 'express';

import { serverConfig } from '@config/server';
import { ensureDeveloperIsAuthenticate } from '~/middlewares/ensureDeveloperIsAuthenticated';

import { addFriend } from '~/routes/friends/add';
import { removeFriend } from '~/routes/friends/remove';
import { friendsFindMany } from '~/routes/friends/findMany';

const route = Router();
const routes = serverConfig.routes.friends;

route.post(routes.add, ensureDeveloperIsAuthenticate, addFriend);
route.get(routes.findMany, ensureDeveloperIsAuthenticate, friendsFindMany);
route.delete(routes.remove, ensureDeveloperIsAuthenticate, removeFriend);

export { route as friendsRoute };
