export const serverConfig = {
  port: process.env.SERVER_PORT ?? 3333,
  runningCallback: (port: number | string) => () => {
    console.log(`Server is running at: http://localhost:${port}`);
  },
  token: {
    secret_key:
      process.env.TOKEN_SECRET_KEY ?? 'b9169daf3082ad21e27b1668d51c2d56',
  },
  uploads: {
    developers: process.env.UPLOAD_PATH_DEVELOPER ?? 'uploads_developers',
    posts: process.env.UPLOAD_PATH_POST ?? 'uploads_posts',
  },
  routes: {
    docs: {
      swagger: '/api-docs',
    },
    account: {
      register: '/account/register',
      login: '/account/login',
    },
    developers: {
      findOne: '/developers/:id',
      me: '/developer/me',
      findMany: '/developers',
      delete: '/developer/delete',
      update: '/developer/update',
    },
    friends: {
      add: '/friends/add/:id',
      remove: '/friends/remove/:id',
      findMany: '/friends/all/:id',
    },
    posts: {
      create: '/posts/create',
      edit: '/posts/edit/:id',
      delete: '/posts/delete/:id',
      findMany: '/posts',
      findOne: '/posts/detail/:id',
      comments: '/posts/comments/:id',
      likes: '/posts/likes/:id',
    },
  },
};
