import type { Post } from './Post';

export interface AuthorPosts {
  posts: Post[];
  totalPosts: number;
  page: number;
  totalPages: number;
}
