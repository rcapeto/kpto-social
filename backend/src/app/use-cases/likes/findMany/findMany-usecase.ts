import {
  LikesRepository,
  FindManyLikesParams,
  FindManyLikesResponse,
} from '~/app/repositories/likes';

type Request = FindManyLikesParams;
type Response = FindManyLikesResponse;

export class LikesManyUsecase {
  constructor(private repository: LikesRepository) {}

  async execute(request: Request): Response {
    const defaultParams: Partial<Request> = {
      page: 1,
      perPage: 10,
      search: '',
      postId: '',
    };

    const params = Object.assign(defaultParams, request);
    const response = await this.repository.findMany(params);

    return response;
  }
}
