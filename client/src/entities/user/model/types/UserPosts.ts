import type { UserPost } from './UserPost';

export interface UserPosts {
  posts: UserPost[];
  totalPosts: number;
  page: number;
  totalPages: number;
}
