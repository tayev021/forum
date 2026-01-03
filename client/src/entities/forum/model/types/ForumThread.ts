import type { Thread } from '../../../../shared/types/Thread';

export type ForumThread = Pick<
  Thread,
  'id' | 'title' | 'views' | 'createdAt' | 'updatedAt'
> & { postsCount: number };
