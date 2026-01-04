import type { Post as BasePost } from '../../../../shared/types/Post';
import type { Thread } from '../../../../shared/types/Thread';

export type UserPost = Pick<BasePost, 'id' | 'content' | 'createdAt'> & {
  thread: Pick<Thread, 'id' | 'title'> & { page: number };
};
