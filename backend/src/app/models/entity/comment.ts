import { DeveloperEntity } from './developer';
import { PostEntity } from './post';

export interface CommentEntity {
  id: string;
  createdAt: Date;
  author?: DeveloperEntity;
  developerId: string;
  post?: PostEntity;
  postId: string;
}
