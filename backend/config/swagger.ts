import { JsonObject } from 'swagger-ui-express';

export const swaggerConfig: JsonObject = {
  openapi: '3.0.0',
  info: {
    title: 'APIs do App [Kpto-Social]',
    description: 'This is an API Rent',
    version: '1.0.0',
    contact: {
      email: 'raphaelcapeto@gmail.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3333',
    },
  ],
};
