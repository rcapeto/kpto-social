import {
  DevelopersRepository,
  DevelopersRepositoryFindOneResponse,
} from '~/app/repositories/developers';
import { FindOneDeveloperSchema } from '~/validation/developers/findOne';

type Request = FindOneDeveloperSchema;
type Response = DevelopersRepositoryFindOneResponse;

export class DevelopersFindOneUsecase {
  constructor(private repository: DevelopersRepository) {}

  async execute(request: Request): Response {
    const response = await this.repository.findOne(request);
    return response;
  }
}
