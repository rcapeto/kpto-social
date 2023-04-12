import express from 'express';
import cors from 'cors';
import path from 'path';

import { serverConfig } from '@config/server';
import { routes } from '~/routes';

const server = express();
const PORT = serverConfig.port;
const uploadsPaths = Object.values(serverConfig.uploads);

server.use(cors());
server.use(express.json());

for (const uploadPath of uploadsPaths) {
  server.use(
    `/${uploadPath}`,
    express.static(path.join(__dirname, '..', uploadPath)),
  );
}

for (const route of routes) {
  server.use(route);
}

server.listen(PORT, serverConfig.runningCallback(PORT));
