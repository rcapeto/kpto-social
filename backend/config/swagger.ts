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
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  data: {
                    error: true,
                    message: 'Some validation error',
                    cause: 'validation_error',
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  data: {
                    error: true,
                    message: 'Internal Server Error',
                    cause: 'server_error',
                  },
                },
              },
            },
          },
        },
      },
    },
    [serverConfig.routes.account.login]: {
      post: {
        tags: ['Account'],
        summary: 'Login',
        description: 'Sign in a developer in application.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AccountLoginParams',
              },
              example: {
                github: 'johndoe',
                password: '@Password123',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AccountLoginResponse',
                },
                example: {
                  data: {
                    token: 'token',
                  },
                },
              },
            },
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  data: {
                    error: true,
                    message: 'Some validation error',
                    cause: 'validation_error',
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  data: {
                    error: true,
                    message: 'Internal Server Error',
                    cause: 'server_error',
                  },
                },
              },
            },
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
      AccountLoginParams: {
        type: 'object',
        properties: {
          github: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      AccountLoginResponse: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          cause: {
            type: 'string',
          },
          error: {
            type: 'boolean',
          },
        },
      },
    },
  },
};
