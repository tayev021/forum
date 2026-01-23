export interface Post {
  id: number;
  threadId: number;
  content: string;
  authorId: number | null;
  likes: number;
  isLiked: boolean;
  isReported: boolean;
  createdAt: string;
  updatedAt: string;
}
