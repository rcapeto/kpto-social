import { JsonObject } from 'swagger-ui-express';
import { serverConfig } from '@config/server';

const routes = serverConfig.routes;

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
    [routes.account.register]: {
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
    [routes.account.login]: {
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
    [routes.developers.findOne]: {
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
                      _count: {
                        posts: 2,
                        comments: 0,
                        likes: 0,
                        friends: 1,
                        symmetricFriends: 1,
                      },
                      avatar_url: {
                        origin: '',
                        web: '',
                        mobile: '',
                      },
                      posts: [
                        {
                          title: 'Post pelo backend',
                          thumbnail: {
                            origin: '',
                            web: '',
                            mobile: '',
                          },
                          comments: 0,
                          likes: 0,
                        },
                      ],
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
    [routes.developers.me]: {
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
                      _count: {
                        posts: 2,
                        comments: 0,
                        likes: 0,
                        friends: 1,
                        symmetricFriends: 1,
                      },
                      avatar_url: {
                        origin: '',
                        web: '',
                        mobile: '',
                      },
                      posts: [
                        {
                          title: 'Post pelo backend',
                          thumbnail: {
                            origin: '',
                            web: '',
                            mobile: '',
                          },
                          comments: 0,
                          likes: 0,
                        },
                      ],
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
    [routes.developers.findMany]: {
      get: {
        tags: ['Developer'],
        summary: 'Developers',
        description: 'Get developers',
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
              type: 'string',
            },
            required: false,
            description: 'Filter by developer name, techs and github',
          },
        ],
        responses: {
          200: {
            description: 'Get developers data with success',
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
                        _count: {
                          posts: 2,
                          comments: 0,
                          likes: 0,
                          friends: 1,
                          symmetricFriends: 1,
                        },
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
    [routes.developers.delete]: {
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
    [routes.developers.update]: {
      put: {
        tags: ['Developer'],
        summary: 'Developers',
        description: 'Update developer data',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateDeveloperParams',
              },
              example: {
                name: 'John Doe [new name]',
                password: '@Password123',
                avatar_url: 'FormData File',
                techs: 'react,node,react-native',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Update developer with success',
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
    [routes.friends.add]: {
      post: {
        tags: ['Friend'],
        summary: 'Friendship',
        description: 'Create a friend to a developer',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'Developer ID [want to add]',
          },
        ],
        responses: {
          201: {
            description: 'Create a friend',
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
    [routes.friends.findMany]: {
      get: {
        tags: ['Friend'],
        summary: 'Friendship',
        description: 'Get friends.',
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
              type: 'string',
            },
            required: false,
            description: 'Filter by developer name, techs and github',
          },
        ],
        responses: {
          200: {
            description: 'Get developer friends with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FindManyFriendsResponse',
                },
                example: {
                  data: {
                    friends: [
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
    [routes.friends.remove]: {
      delete: {
        tags: ['Friend'],
        summary: 'Friendship',
        description: 'Remove a friend from a developer',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'Developer ID [want to remove]',
          },
        ],
        responses: {
          200: {
            description: 'Remove a friend',
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
    [routes.posts.create]: {
      post: {
        tags: ['Post'],
        summary: 'Posts',
        description: 'Create a post',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreatePostParams',
              },
              example: {
                title: 'Post Title',
                description: 'Post description',
                thumbnail: 'FormData File',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Create a post',
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
    [routes.posts.findMany]: {
      get: {
        tags: ['Post'],
        summary: 'Posts',
        description: 'Get posts',
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
            description: 'Number of posts per page',
          },
          {
            in: 'query',
            name: 'search',
            schema: {
              type: 'string',
            },
            required: false,
            description:
              'Filter by post title, post description or author name',
          },
        ],
        responses: {
          200: {
            description: 'Get posts data with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FindManyPostsResponse',
                },
                example: {
                  data: {
                    posts: [
                      {
                        id: 'the-incredible-post-id',
                        title: 'React Documentation',
                        description: 'Look this new react documentation here: ',
                        createdAt: '2023-04-10T05:05:21.713Z',
                        editAt: null,
                        developerId: 'developerId',
                        author: {
                          name: 'John Doe',
                          avatar_url: {
                            origin: '',
                            web: '',
                            mobile: '',
                          },
                          github: 'johndoe',
                        },
                        thumbnail: {
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
    [routes.posts.delete]: {
      delete: {
        tags: ['Post'],
        summary: 'Posts',
        description: 'Delete a post',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'Post ID',
          },
        ],
        responses: {
          200: {
            description: 'Delete a post',
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
    [routes.posts.findOne]: {
      get: {
        tags: ['Post'],
        summary: 'Posts',
        description: 'Find a post',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'Post ID',
          },
        ],
        responses: {
          200: {
            description: 'Post data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FindOnePostResponse',
                },
                example: {
                  data: {
                    post: {
                      createdAt: '2023-04-10T05:05:21.742Z',
                      editAt: null,
                      title: 'Post Title',
                      description: 'Post description',
                      id: '017ee7f0-6a23-4205-bd75-205b7fe32bde',
                      developerId: '57ab2ca0-64b8-44c6-bdbe-898fb45de074',
                      comments: 8,
                      likes: 8,
                      author: {
                        id: '57ab2ca0-64b8-44c6-bdbe-898fb45de074',
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
                      thumbnail: {
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
    [routes.posts.edit]: {
      put: {
        tags: ['Post'],
        summary: 'Posts',
        description: 'Update post data',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdatePostParams',
              },
              example: {
                title: 'New post title',
                description: 'New post description',
                thumbnail: 'FormData File',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Update post with success',
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
    [routes.comments.findMany]: {
      get: {
        tags: ['Comment'],
        summary: 'Comments',
        description: 'Get post comments',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'Post ID',
          },
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
            description: 'Number of posts per page',
          },
          {
            in: 'query',
            name: 'search',
            schema: {
              type: 'string',
            },
            required: false,
            description:
              'Filter by post title, post description or author name',
          },
        ],
        responses: {
          200: {
            description: 'Get post comments data with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FindManyCommentsResponse',
                },
                example: {
                  data: {
                    comments: [
                      {
                        id: 'comment-id',
                        author: {
                          name: 'John Doe',
                          github: 'johndoe',
                          id: '2ea5c516-e42b-4f7d-bafb-d06a116f38d4',
                          avatar_url: {
                            origin: '',
                            web: '',
                            mobile: '',
                          },
                        },
                        text: 'Comment text',
                        createdAt: '2023-04-12T16:00:05.430Z',
                        postId: '5cd67d6f-9dc4-4f25-808e-c8998a166663',
                      },
                    ],
                    perPage: 10,
                    page: 1,
                    search: '',
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
    [routes.comments.delete]: {
      delete: {
        tags: ['Comment'],
        summary: 'Comments',
        description: 'Delete a comment',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'Comment ID',
          },
        ],
        responses: {
          200: {
            description: 'Delete a comment',
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
    [routes.comments.create]: {
      post: {
        tags: ['Comment'],
        summary: 'Comments',
        description: 'Create a comment',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateCommentParams',
              },
              example: {
                text: 'Create text with this text',
                postId: 'post-id-example',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Create comment with success',
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
    [routes.likes.findMany]: {
      get: {
        tags: ['Like'],
        summary: 'Likes',
        description: 'Get post likes',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'Post ID',
          },
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
            description: 'Number of likes per page',
          },
          {
            in: 'query',
            name: 'search',
            schema: {
              type: 'string',
            },
            required: false,
            description: 'Filter by author name',
          },
        ],
        responses: {
          200: {
            description: 'Get post likes data with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FindManyLikesResponse',
                },
                example: {
                  data: {
                    likes: [
                      {
                        id: 'like-id',
                        author: {
                          name: 'string',
                        },
                        developerId: 'string',
                        postId: 'string',
                      },
                    ],
                    perPage: 10,
                    page: 1,
                    search: '',
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
    [routes.likes.check]: {
      get: {
        tags: ['Like'],
        summary: 'Likes',
        description: 'Get post like',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'Post ID',
          },
        ],
        responses: {
          200: {
            description: 'Get if the post is liked',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CheckLikeResponse',
                },
                example: {
                  data: {
                    liked: true,
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
    [routes.likes.toggle]: {
      post: {
        tags: ['Like'],
        summary: 'Likes',
        description: 'Like or dislike Post',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'Post ID',
          },
        ],
        responses: {
          200: {
            description: 'Like or dislike post',
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
          _count: {
            type: 'object',
            properties: {
              posts: {
                type: 'number',
              },
              comments: {
                type: 'number',
              },
              likes: {
                type: 'number',
              },
              friends: {
                type: 'number',
              },
            },
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
          posts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                thumbnail: {
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
                comments: {
                  type: 'number',
                },
                likes: {
                  type: 'number',
                },
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
                _count: {
                  type: 'object',
                  properties: {
                    posts: {
                      type: 'number',
                    },
                    comments: {
                      type: 'number',
                    },
                    likes: {
                      type: 'number',
                    },
                    friends: {
                      type: 'number',
                    },
                  },
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
      UpdateDeveloperParams: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          techs: {
            type: 'string',
          },
          avatar_url: {
            type: 'string',
          },
        },
      },
      FriendshipParams: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
          },
        },
      },
      FindManyFriendsResponse: {
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
          friends: {
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
      CreatePostParams: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          thumbnail: {
            type: 'string',
          },
        },
      },
      FindManyPostsResponse: {
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
          posts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
                title: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                createdAt: {
                  type: 'string',
                },
                updatedAt: {
                  type: 'string',
                },
                thumbnail: {
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
                developerId: {
                  type: 'string',
                },
                author: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                    },
                    github: {
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
      },
      FindOnePostResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
          },
          updatedAt: {
            type: 'string',
          },
          thumbnail: {
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
          developerId: {
            type: 'string',
          },
          author: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              github: {
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
          likes: {
            type: 'number',
          },
          comments: {
            type: 'number',
          },
        },
      },
      UpdatePostParams: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          thumbnail: {
            type: 'string',
          },
        },
      },
      FindManyCommentsResponse: {
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
          comments: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
                text: {
                  type: 'string',
                },
                postId: {
                  type: 'string',
                },
                createdAt: {
                  type: 'string',
                },
                author: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                    },
                    github: {
                      type: 'string',
                    },
                    id: {
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
      },
      CreateCommentParams: {
        type: 'object',
        properties: {
          postId: {
            type: 'string',
          },
          text: {
            type: 'string',
          },
        },
      },
      FindManyLikesResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          author: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
        },
      },
      CheckLikeResponse: {
        type: 'object',
        properties: {
          liked: {
            type: 'boolean',
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
