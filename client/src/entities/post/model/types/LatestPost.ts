import type { LatestPostAuthor } from './LatestPostAuthor';
import type { LatestPostThread } from './LatestPostThread';

export interface LatestPost {
  id: number;
  author: LatestPostAuthor | null;
  thread: LatestPostThread;
  content: string;
  createdAt: string;
}
