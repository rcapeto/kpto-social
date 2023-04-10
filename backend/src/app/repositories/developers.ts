import { DeveloperEntity } from '../models/entity/developer';

export interface DevelopersRepositoryFindOneParams {
  developerId: string;
}

export type DevelopersRepositoryFindOneResponse = Promise<{
  developer?: DeveloperEntity | null;
}>;

export interface DevelopersRepositoryFindManyParams {
  perPage: number;
  page: number;
  search: string;
}

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
}
