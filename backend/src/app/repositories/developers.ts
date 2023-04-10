import { DeveloperEntity } from '../models/entity/developer';

export interface DevelopersRepositoryFindOneParams {
  developerId: string;
}
export type DevelopersRepositoryFindOneResponse = Promise<{
  developer?: DeveloperEntity | null;
}>;

export abstract class DevelopersRepository {
  findOne: (
    params: DevelopersRepositoryFindOneParams,
  ) => DevelopersRepositoryFindOneResponse;
}
