import { Router } from 'express';
import multer from 'multer';

import { serverConfig } from '@config/server';
import { multerConfig } from '@config/multer';

import { createPost } from './create';
import { findManyPosts } from './findMany';
import { deletePost } from './delete';
import { findOnePost } from './findOne';
import { updatePost } from './update';
import { getPostComments } from './comments';

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
route.get(routes.findOne, ensureDeveloperIsAuthenticate, findOnePost);

route.put(
  routes.edit,
  ensureDeveloperIsAuthenticate,
  multerPath.single('thumbnail'),
  updatePost,
);

route.get(routes.comments, ensureDeveloperIsAuthenticate, getPostComments);

export { route as postsRoute };
