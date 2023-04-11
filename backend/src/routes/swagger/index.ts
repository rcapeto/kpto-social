import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';

import { swaggerConfig } from '@config/swagger';
import { serverConfig } from '@config/server';

export const swaggerRoute = Router();
const routePath = serverConfig.routes.docs.swagger;

swaggerRoute.use(routePath, swaggerUI.serve, swaggerUI.setup(swaggerConfig));
