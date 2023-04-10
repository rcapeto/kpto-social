import { DeveloperEntity } from './developer';
import { PostEntity } from './post';

export interface LikeEntity {
  id: string;
  developerId: string;
  postId: string;
  author?: DeveloperEntity;
  post?: PostEntity;
}
