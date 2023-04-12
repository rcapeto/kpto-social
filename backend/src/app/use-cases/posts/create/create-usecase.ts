import {
  PostsCreateParams,
  PostsRepository,
  PostsCreateResponse,
} from '~/app/repositories/posts';

type Request = PostsCreateParams;
type Response = PostsCreateResponse;

export class PostsCreateUsecase {
  constructor(private repository: PostsRepository) {}

  async execute(request: Request): Response {
    await this.repository.create(request);
  }
}
