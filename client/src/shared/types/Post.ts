export interface Post {
  id: number;
  threadId: number;
  content: string;
  authorId: number | null;
  createdAt: string;
  updatedAt: string;
}
