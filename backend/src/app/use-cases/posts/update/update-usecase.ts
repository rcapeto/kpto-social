import {
  PostsRepository,
  PostsUpdateParams,
  PostsUpdateResponse,
} from '~/app/repositories/posts';

type Request = PostsUpdateParams;
type Response = PostsUpdateResponse;

const defaultParams: PostsUpdateParams = {
  postId: '',
  description: '',
  thumbnail: '',
  title: '',
  developerId: '',
};

export class PostsUpdateUsecase {
  constructor(private repository: PostsRepository) {}

  async execute(request: Request): Response {
    const params = Object.assign(defaultParams, request);
    await this.repository.update(params);
  }
}
