import type { Thread as BaseThread } from '../../../../shared/types/Thread';
import type { ThreadPost } from './ThreadPost';

export type Thread = BaseThread & {
  posts: ThreadPost[];
  totalPosts: number;
  page: number;
  totalPages: number;
};
