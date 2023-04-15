import {
  PostsRepository,
  PostsFindManyDeveloperParams,
  PostsFindManyDeveloperResponse,
} from '~/app/repositories/posts';

type Request = PostsFindManyDeveloperParams;
type Response = PostsFindManyDeveloperResponse;

export class PostsFindManyDeveloperUsecase {
  constructor(private repository: PostsRepository) {}

  async execute(request: Request): Response {
    const params = Object.assign({ perPage: 10, page: 1, search: '' }, request);
    const response = await this.repository.findManyDeveloperPosts(params);
    return response;
  }
}
