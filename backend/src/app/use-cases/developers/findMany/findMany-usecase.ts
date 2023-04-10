import {
  DevelopersRepository,
  DevelopersRepositoryFindManyParams,
  DevelopersRepositoryFindManyResponse,
} from '~/app/repositories/developers';

type Request = Partial<DevelopersRepositoryFindManyParams>;
type Response = DevelopersRepositoryFindManyResponse;

export class DevelopersFindManyUsecase {
  constructor(private repository: DevelopersRepository) {}

  async execute(request?: Request): Response {
    const params = Object.assign({ perPage: 10, page: 1, search: '' }, request);
    const response = await this.repository.findMany(params);

    return response;
  }
}
