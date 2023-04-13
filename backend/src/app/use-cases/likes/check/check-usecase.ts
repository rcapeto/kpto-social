import {
  LikesRepository,
  LikesCheckParams,
  LikesCheckResponse,
} from '~/app/repositories/likes';

type Request = LikesCheckParams;
type Response = LikesCheckResponse;

export class LikesCheckUsecase {
  constructor(private repository: LikesRepository) {}

  async execute(request: Request): Response {
    const defaultParams: Request = { developerId: '', postId: '' };
    const params = Object.assign(defaultParams, request);
    const response = await this.repository.check(params);

    return response;
  }
}
