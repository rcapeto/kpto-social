import {
  PostsRepository,
  PostsFindManyParams,
  PostsFindManyResponse,
} from '~/app/repositories/posts';

type Request = PostsFindManyParams;
type Response = PostsFindManyResponse;

export class PostsFindManyUsecase {
  constructor(private repository: PostsRepository) {}

  async execute(request: Request): Response {
    const params = Object.assign({ perPage: 10, page: 1, search: '' }, request);
    const response = await this.repository.findMany(params);
    return response;
  }
}
