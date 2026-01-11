import type { Thread } from '../../../../shared/types/Thread';

export interface UserSubscription {
  id: number;
  thread: Pick<Thread, 'id' | 'title'>;
  lastReadAt: string;
  createdAt: string;
}
