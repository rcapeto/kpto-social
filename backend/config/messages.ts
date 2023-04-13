export const messages = {
  DEVELOPER_ALREADY_EXISTS: 'There is already a developer with this github',
  NOT_FOUND_DEVELOPER_LOGIN: 'Developer not found, please register',
  NOT_FOUND_COMMENT: 'Comment does not exists, please check the ID',
  NOT_FOUND_DEVELOPER: 'Developer not found, please check the ID',
  NOT_FOUND_DEVELOPER_FRIEND:
    'Developer you want to be friend was not found, please check the ID',
  NOT_FOUND_POST: 'Post does not exists, please check the ID',
  WRONG_PASSWORD:
    'Please verify the username or password, something is incorrect',
  PASSWORDS_NOT_MATCH: 'Fill both password fields equally',
  AUTHORIZATION_COMMENT:
    'You can not delete this comment, only the comment author can delete it.',
  AUTHORIZATION_ACCOUNT:
    'You can not delete this account, only the correct user can delete it.',
  AUTHORIZATION_POST_UPDATE:
    'You can not update this post, only the post author can update it.',
  AUTHORIZATION_POST_DELETE:
    'You can not delete this post, only the post author can delete it.',
  EMPTY_FIELD: (field: string) => `The ${field} field can not be empty.`,
};
