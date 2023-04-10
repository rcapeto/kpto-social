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
      get: {
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
    [serverConfig.routes.developers.findOne]: {
      get: {
        tags: ['Developer'],
        summary: 'Developers',
        description: 'Find one developer in application.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            security: [{ bearerAuth: [] }],
            required: true,
            description: 'Developer ID',
          },
        ],
        responses: {
          200: {
            description: 'Get developer data with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DeveloperEntity',
                },
                example: {
                  data: {
                    developer: {
                      id: 'the-incredible-developer-id',
                      name: 'John Doe',
                      techs: 'react,react-native,typescript',
                      createdAt: '2023-04-10T05:05:21.713Z',
                      github: 'johndoe',
                      avatar_url: {
                        origin: '',
                        web: '',
                        mobile: '',
                      },
                    },
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
          401: {
            description: 'Unauthorized error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  data: {
                    error: true,
                    message: 'Please login to use this route.',
                    cause: 'unauthorized_error',
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
    [serverConfig.routes.developers.me]: {
      get: {
        tags: ['Developer'],
        summary: 'Developers',
        description: 'Get logged developer profile.',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Get developer data with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DeveloperEntity',
                },
                example: {
                  data: {
                    developer: {
                      id: 'the-incredible-developer-id',
                      name: 'John Doe',
                      techs: 'react,react-native,typescript',
                      createdAt: '2023-04-10T05:05:21.713Z',
                      github: 'johndoe',
                      avatar_url: {
                        origin: '',
                        web: '',
                        mobile: '',
                      },
                    },
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
          401: {
            description: 'Unauthorized error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  data: {
                    error: true,
                    message: 'Please login to use this route.',
                    cause: 'unauthorized_error',
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
    [serverConfig.routes.developers.findMany]: {
      get: {
        tags: ['Developer'],
        summary: 'Developers',
        description: 'Get logged developer profile.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'number',
            },
            required: false,
            description: 'Page',
          },
          {
            in: 'query',
            name: 'perPage',
            schema: {
              type: 'number',
            },
            required: false,
            description: 'Number of developers per page',
          },
          {
            in: 'query',
            name: 'search',
            schema: {
              type: 'number',
            },
            required: false,
            description: 'Filter by developer name, techs and github',
          },
        ],
        responses: {
          200: {
            description: 'Get developer data with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FindManyDevelopersResponse',
                },
                example: {
                  data: {
                    developers: [
                      {
                        id: 'the-incredible-developer-id',
                        name: 'John Doe',
                        techs: 'react,react-native,typescript',
                        createdAt: '2023-04-10T05:05:21.713Z',
                        github: 'johndoe',
                        avatar_url: {
                          origin: '',
                          web: '',
                          mobile: '',
                        },
                      },
                    ],
                    perPage: 10,
                    page: 1,
                    search: 'react',
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
          401: {
            description: 'Unauthorized error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  data: {
                    error: true,
                    message: 'Please login to use this route.',
                    cause: 'unauthorized_error',
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
    [serverConfig.routes.developers.delete]: {
      delete: {
        tags: ['Developer'],
        summary: 'Developers',
        description: 'Delete developer',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Delete developer with success',
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
          401: {
            description: 'Unauthorized error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  data: {
                    error: true,
                    message: 'Please login to use this route.',
                    cause: 'unauthorized_error',
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
      DeveloperEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          techs: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
          },
          avatar_url: {
            type: 'object',
            properties: {
              origin: {
                type: 'string',
              },
              web: {
                type: 'string',
              },
              mobile: {
                type: 'string',
              },
            },
          },
        },
      },
      FindManyDevelopersResponse: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
          },
          perPage: {
            type: 'number',
          },
          search: {
            type: 'string',
          },
          developers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
                name: {
                  type: 'string',
                },
                techs: {
                  type: 'string',
                },
                createdAt: {
                  type: 'string',
                },
                avatar_url: {
                  type: 'object',
                  properties: {
                    origin: {
                      type: 'string',
                    },
                    web: {
                      type: 'string',
                    },
                    mobile: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
