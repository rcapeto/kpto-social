import { CommentEntity } from './comment';
import { LikeEntity } from './like';
import { PostEntity } from './post';

export interface DeveloperEntity {
  id: string;
  name: string;
  avatar_url: string;
  techs: string;
  password: string;
  createdAt: Date;
  github: string;
  posts?: PostEntity[];
  comments?: CommentEntity[];
  likes?: LikeEntity[];
  friends?: DeveloperEntity[];
  symmetricFriends?: DeveloperEntity[];
  _count?: {
    posts: number;
    comments: number;
    likes: number;
    friends: number;
    symmetricFriends: number;
  };
}
