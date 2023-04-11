import { DeveloperEntity } from '~/app/models/entity/developer';
import { UpdateDeveloperSchema } from '~/validation/developers/update';
import { DevelopersFindManySchema } from '~/validation/developers/findMany';

export interface DevelopersRepositoryFindOneParams {
  developerId: string;
}

export type DevelopersRepositoryFindOneResponse = Promise<{
  developer?: DeveloperEntity | null;
}>;

export type DevelopersRepositoryFindManyParams = DevelopersFindManySchema;

export type DevelopersRepositoryFindManyResponse = Promise<
  {
    developers?: DeveloperEntity[] | null;
    count: number;
  } & DevelopersRepositoryFindManyParams
>;

export interface DevelopersRepositoryDeleteParams {
  developerId: string;
}

export type DevelopersRepositoryDeleteResponse = Promise<void>;

export interface DevelopersUpdateParams extends UpdateDeveloperSchema {
  avatar_url: string;
}

export type DevelopersRepositoryUpdateResponse = Promise<{
  developer?: DeveloperEntity | null;
}>;

export abstract class DevelopersRepository {
  findOne: (
    params: DevelopersRepositoryFindOneParams,
  ) => DevelopersRepositoryFindOneResponse;
  findMany: (
    params: DevelopersRepositoryFindManyParams,
  ) => DevelopersRepositoryFindManyResponse;
  delete: (
    params: DevelopersRepositoryDeleteParams,
  ) => DevelopersRepositoryDeleteResponse;
  update: (
    developerId: string,
    params: DevelopersUpdateParams,
  ) => DevelopersRepositoryUpdateResponse;
}
