export interface LikeEntity {
  id: string;
  developerId: string;
  postId: string;
  author?: {
    name: string;
  };
}
