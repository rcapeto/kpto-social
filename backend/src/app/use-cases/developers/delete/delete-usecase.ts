import {
  DevelopersRepository,
  DevelopersRepositoryDeleteParams,
  DevelopersRepositoryDeleteResponse,
} from '~/app/repositories/developers';

type Request = DevelopersRepositoryDeleteParams;
type Response = DevelopersRepositoryDeleteResponse;

export class DevelopersDeleteUsecase {
  constructor(private repository: DevelopersRepository) {}

  async execute(request: Request): Response {
    await this.repository.delete(request);
  }
}
