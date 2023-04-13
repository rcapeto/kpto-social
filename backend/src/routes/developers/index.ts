import { Router } from 'express';
import multer from 'multer';

import { serverConfig } from '@config/server';
import { multerConfig } from '@config/multer';
import { ensureDeveloperIsAuthenticate } from '~/middlewares/ensureDeveloperIsAuthenticated';

import { findOneDeveloper } from '~/routes/developers/findOne';
import { me } from '~/routes/developers/me';
import { findManyDevelopers } from '~/routes/developers/findMany';
import { deleteDeveloper } from '~/routes/developers/delete';
import { updateDeveloper } from '~/routes/developers/update';

const multerPath = multer(multerConfig.developers);

const route = Router();
const routes = serverConfig.routes.developers;

route.get(routes.findOne, ensureDeveloperIsAuthenticate, findOneDeveloper);
route.get(routes.me, ensureDeveloperIsAuthenticate, me);
route.get(routes.findMany, ensureDeveloperIsAuthenticate, findManyDevelopers);
route.delete(routes.delete, ensureDeveloperIsAuthenticate, deleteDeveloper);
route.put(
  routes.update,
  multerPath.single('avatar_url'),
  ensureDeveloperIsAuthenticate,
  updateDeveloper,
);

export { route as developersRoute };
