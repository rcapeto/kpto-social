import { CommentEntity } from './comment';
import { DeveloperEntity } from './developer';
import { LikeEntity } from './like';

export interface PostEntity {
  id: string;
  createdAt: Date;
  editAt?: Date;
  title: string;
  thumbnail: string;
  description: string;
  author?: DeveloperEntity;
  developerId: string;
  comments: CommentEntity[];
  likes: LikeEntity[];
}
