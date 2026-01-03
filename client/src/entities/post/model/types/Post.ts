import type { Post as BasePost } from '../../../../shared/types/Post';
import type { PostThread } from './PostThread';

export type Post = Pick<BasePost, 'id' | 'content' | 'createdAt'> & {
  thread: PostThread;
};
