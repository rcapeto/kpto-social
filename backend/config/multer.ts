import multer from 'multer';
import path from 'path';
import { serverConfig } from '@config/server';

/**
 * info: You need to create the folders: uploads_developers and uploads_posts
 * in backend root project
 */

function createFilename(file: Express.Multer.File) {
  const filename = file.originalname;
  return `${Date.now()}-${filename}`;
}

const developers = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', serverConfig.uploads.developers),
    filename: (request, file, callback) => callback(null, createFilename(file)),
  }),
};

const posts = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', serverConfig.uploads.posts),
    filename: (request, file, callback) => callback(null, createFilename(file)),
  }),
};

export const multerConfig = {
  developers,
  posts,
};
