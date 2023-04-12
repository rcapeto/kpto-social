import {
  PostsRepository,
  PostsFindOneParams,
  PostsFindOneResponse,
} from '~/app/repositories/posts';

type Request = PostsFindOneParams;
type Response = PostsFindOneResponse;

export class PostsFindOneUsecase {
  constructor(private repository: PostsRepository) {}

  async execute(request: Request): Response {
    const response = await this.repository.findOne(request);
    return response;
  }
}
