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
};

export class DevelopersUpdateUsecase {
  constructor(private repository: DevelopersRepository) {}

  async execute(request: Request): Response {
    const { developerId, params: incomeParams } = request;
    const params = Object.assign(defaultParams, incomeParams);

    await this.repository.update(developerId, params);
  }
}
