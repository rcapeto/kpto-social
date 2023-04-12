import {
  CommentsRepository,
  DeleteCommentParams,
  DeleteCommentResponse,
} from '~/app/repositories/comments';

type Request = DeleteCommentParams;
type Response = DeleteCommentResponse;

const defaultParams: DeleteCommentParams = {
  commentId: '',
  developerId: '',
};

export class CommentsDeleteUsecase {
  constructor(private repository: CommentsRepository) {}

  async execute(request: Request): Response {
    const params = Object.assign(defaultParams, request);
    await this.repository.delete(params);
  }
}
