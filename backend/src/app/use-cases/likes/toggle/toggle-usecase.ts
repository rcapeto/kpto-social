import {
  LikesRepository,
  LikesToggleParams,
  LikesToggleResponse,
} from '~/app/repositories/likes';

type Request = LikesToggleParams;
type Response = LikesToggleResponse;

export class LikesToggleUsecase {
  constructor(private repository: LikesRepository) {}

  async execute(request: Request): Response {
    const defaultParams: Request = { developerId: '', postId: '' };
    const params = Object.assign(defaultParams, request);

    await this.repository.toggle(params);
  }
}
