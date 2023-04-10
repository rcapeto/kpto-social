import { JsonObject } from 'swagger-ui-express';
import { serverConfig } from '@config/server';

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
  paths: {
    [serverConfig.routes.account.register]: {
      post: {
        tags: ['Account'],
        summary: 'Register',
        description: 'Register a new developer.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AccountRegister',
              },
              example: {
                name: 'John Doe',
                github: 'johndoe',
                password: '@Password123',
                confirm_password: '@Password123',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Developer was created with success',
          },
          400: {
            description:
              'Validation error, developer already exists or passwords do not match',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      AccountRegister: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          github: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          confirm_password: {
            type: 'string',
          },
        },
      },
    },
  },
};
