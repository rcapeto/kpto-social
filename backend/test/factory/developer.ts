import { randomUUID } from 'node:crypto';

import { DeveloperEntity } from '~/app/models/entity/developer';

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
