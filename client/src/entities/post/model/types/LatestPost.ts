import type { Post as BasePost } from '../../../../shared/types/Post';
import type { LatestPostAuthor } from './LatestPostAuthor';
import type { LatestPostThread } from './LatestPostThread';

export type LatestPost = Pick<BasePost, 'id' | 'content' | 'createdAt'> & {
  author: LatestPostAuthor | null;
  thread: LatestPostThread;
};
