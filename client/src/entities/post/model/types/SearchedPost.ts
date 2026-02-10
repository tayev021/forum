import type { Post as BasePost } from '../../../../shared/types/Post';
import type { SearchedPostAuthor } from './SearchedPostAuthor';
import type { SearchedPostThread } from './SearchedPostThread';

export type SearchedPost = Pick<BasePost, 'id' | 'content' | 'createdAt'> & {
  author: SearchedPostAuthor | null;
  thread: SearchedPostThread;
};
