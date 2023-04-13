import { CommentEntity } from '~/app/models/entity/comment';
import { renderDeveloper } from '~/app/views/renderDeveloper';

export function renderComment(comment: CommentEntity) {
  const { author, ...rest } = comment;

  return {
    author: author ? renderDeveloper(author) : undefined,
    ...rest,
  };
}
