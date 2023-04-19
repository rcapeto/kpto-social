export const apiURLs = {
  account: {
    register: '/account/register',
    login: '/account/login',
  },
  developers: {
    findOne: (developerId: string) => `/developers/${developerId}`,
    me: '/developer/me',
    findMany: '/developers',
    delete: '/developer/delete',
    update: '/developer/update',
  },
  friends: {
    add: (userId: string) => `/friends/add/${userId}`,
    remove: (userId: string) => `/friends/remove/${userId}`,
    findMany: (userId: string) => `/friends/all/${userId}`,
  },
  posts: {
    create: '/posts/create',
    edit: (postId: string) => `/posts/edit/${postId} `,
    delete: (postId: string) => `/posts/delete/${postId} `,
    findMany: '/posts',
    findOne: (postId: string) => `/posts/detail/${postId}`,
    findManyDevelopers: (developerId: string) =>
      `/posts/developer/${developerId}`,
  },
  comments: {
    findMany: (postId: string) => `/comments/posts/${postId}`,
    delete: (commentId: string) => `/comments/delete/${commentId}`,
    create: '/comments/create',
  },
  likes: {
    toggle: (postId: string) => `/likes/toggle/${postId}`,
    check: (postId: string) => `/like/post/${postId}`,
    findMany: (postId: string) => `/likes/posts/${postId}`,
  },
}
