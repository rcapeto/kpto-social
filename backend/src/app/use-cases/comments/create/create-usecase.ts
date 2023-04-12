import {
  CommentsRepository,
  CreateCommentParams,
  CreateCommentResponse,
} from '~/app/repositories/comments';

type Request = CreateCommentParams;
type Response = CreateCommentResponse;

const defaultParams: CreateCommentParams = {
  developerId: '',
  postId: '',
  text: '',
};

export class CommentsCreateUsecase {
  constructor(private repository: CommentsRepository) {}

  async execute(request: Request): Response {
    const params = Object.assign(defaultParams, request);
    await this.repository.create(params);
  }
}
