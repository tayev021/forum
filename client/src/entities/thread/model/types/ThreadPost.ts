import type { Post } from '../../../../shared/types/Post';
import type { ThreadPostAuthor } from './ThreadPostAuthor';

export type ThreadPost = Pick<
  Post,
  'id' | 'threadId' | 'content' | 'createdAt' | 'updatedAt'
> & { author: ThreadPostAuthor };
