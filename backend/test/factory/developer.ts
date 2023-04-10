import { DeveloperEntity } from '~/app/models/entity/developer';
import { randomUUID } from 'node:crypto';

type Override = Partial<DeveloperEntity>;

export function makeDeveloper(override: Override = {}): DeveloperEntity {
  return {
    id: randomUUID(),
    avatar_url: '',
    createdAt: new Date(),
    github: 'johndoe',
    name: 'John Doe',
    password: '@johnDoe123',
    techs: '',
    ...override,
  };
}
