import { Router } from 'express';
import multer from 'multer';

import { serverConfig } from '@config/server';
import { multerConfig } from '@config/multer';
import { ensureDeveloperIsAuthenticate } from '~/middlewares/ensureDeveloperIsAuthenticated';

import { createPost } from '~/routes/posts/create';
import { findManyPosts } from '~/routes/posts/findMany';
import { deletePost } from '~/routes/posts/delete';
import { findOnePost } from '~/routes/posts/findOne';
import { updatePost } from '~/routes/posts/update';

const multerPath = multer(multerConfig.posts);

const route = Router();
const routes = serverConfig.routes.posts;

route.post(
  routes.create,
  ensureDeveloperIsAuthenticate,
  multerPath.single('thumbnail'),
  createPost,
);

route.get(routes.findMany, ensureDeveloperIsAuthenticate, findManyPosts);
route.delete(routes.delete, ensureDeveloperIsAuthenticate, deletePost);
route.get(routes.findOne, ensureDeveloperIsAuthenticate, findOnePost);

route.put(
  routes.edit,
  ensureDeveloperIsAuthenticate,
  multerPath.single('thumbnail'),
  updatePost,
);

export { route as postsRoute };
