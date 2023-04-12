import {
  PostsRepository,
  PostsGetCommentsAndLikesParams,
  PostGetCommentsResponse,
} from '~/app/repositories/posts';

type Request = PostsGetCommentsAndLikesParams;
type Response = PostGetCommentsResponse;

export class PostsCommentsUsecase {
  constructor(private repository: PostsRepository) {}

  async execute(request: Request): Response {
    const params = Object.assign({ perPage: 10, page: 1, search: '' }, request);
    const response = await this.repository.comments(params);

    return response;
  }
}
