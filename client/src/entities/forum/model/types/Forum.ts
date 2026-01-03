import type { ForumThread } from './ForumThread';

export interface Forum {
  id: number;
  title: string;
  createdAt: string;
  threads: ForumThread[];
  totalThreads: number;
  page: number;
  totalPages: number;
}
