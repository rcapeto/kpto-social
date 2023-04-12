import {
  PostsRepository,
  PostsDeleteParams,
  PostsDeleteResponse,
} from '~/app/repositories/posts';

type Request = PostsDeleteParams;
type Response = PostsDeleteResponse;

export class PostsDeleteUsecase {
  constructor(private repository: PostsRepository) {}

  async execute(request: Request): Response {
    await this.repository.delete(request);
  }
}
