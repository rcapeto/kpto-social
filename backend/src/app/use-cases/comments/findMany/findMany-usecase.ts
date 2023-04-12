import {
  CommentsRepository,
  FindManyCommentsParams,
  FindManyCommentsResponse,
} from '~/app/repositories/comments';

type Request = FindManyCommentsParams;
type Response = FindManyCommentsResponse;

export class CommentsFindManyUsecase {
  constructor(private repository: CommentsRepository) {}

  async execute(request: Request): Response {
    const params = Object.assign({ perPage: 10, page: 1, search: '' }, request);
    const response = await this.repository.findMany(params);

    return response;
  }
}
