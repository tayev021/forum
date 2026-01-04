import type { Thread } from '../../../../shared/types/Thread';

export type UserThread = Pick<
  Thread,
  'id' | 'title' | 'views' | 'createdAt'
> & { postsCount: number };
