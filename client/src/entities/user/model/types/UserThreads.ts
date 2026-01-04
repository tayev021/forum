import type { UserThread } from './UserThread';

export interface UserThreads {
  threads: UserThread[];
  totalThreads: number;
  page: number;
  totalPages: number;
}
