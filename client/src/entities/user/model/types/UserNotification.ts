import type { Thread } from '../../../thread';

export interface UserNotification {
  id: number;
  lastReadAt: string;
  thread: Pick<Thread, 'id' | 'title'> & {
    unreadPostId: number;
    unreadPostContent: string;
    unreadPostCreatedAt: string;
  };
}
