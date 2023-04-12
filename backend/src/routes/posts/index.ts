import { Router } from 'express';
import multer from 'multer';

import { serverConfig } from '@config/server';
import { multerConfig } from '@config/multer';

import { createPost } from './create';
import { findManyPosts } from './findMany';
import { deletePost } from './delete';
import { ensureDeveloperIsAuthenticate } from '~/middlewares/ensureDeveloperIsAuthenticated';

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

export { route as postsRoute };
