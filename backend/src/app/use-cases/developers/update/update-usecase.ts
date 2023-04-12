import {
  DevelopersRepository,
  DevelopersUpdateParams,
  DevelopersRepositoryUpdateResponse,
} from '~/app/repositories/developers';

type Request = {
  params?: Partial<DevelopersUpdateParams>;
  developerId: string;
};
type Response = DevelopersRepositoryUpdateResponse;

const defaultParams: DevelopersUpdateParams = {
  avatar_url: '',
  name: '',
  password: '',
  techs: '',
  developerId: '',
};

export class DevelopersUpdateUsecase {
  constructor(private repository: DevelopersRepository) {}

  async execute(request: Request): Response {
    const params = Object.assign(defaultParams, request);
    await this.repository.update(params);
  }
}
