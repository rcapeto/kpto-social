import { CommentEntity } from '~/app/models/entity/comment';
import { renderDeveloper } from './renderDeveloper';

export function renderComment(comment: CommentEntity) {
  const { author, ...rest } = comment;

  return {
    author: author ? renderDeveloper(author) : undefined,
    ...rest,
  };
}
