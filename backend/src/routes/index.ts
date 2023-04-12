import { swaggerRoute } from '~/routes/swagger';
import { accountRoute } from '~/routes/account';
import { developersRoute } from '~/routes/developers';
import { friendsRoute } from '~/routes/friends';
import { postsRoute } from '~/routes/posts';
import { commentsRoute } from '~/routes/comments';

export const routes = [
  swaggerRoute,
  accountRoute,
  developersRoute,
  friendsRoute,
  postsRoute,
  commentsRoute,
];
