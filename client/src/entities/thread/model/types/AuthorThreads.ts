import type { AuthorThread } from './AuthorThread';

export interface AuthorThreads {
  threads: AuthorThread[];
  totalThreads: number;
  page: number;
  totalPages: number;
}
