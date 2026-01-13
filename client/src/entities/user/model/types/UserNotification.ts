import type { Thread } from '../../../thread';

export interface UserNotification {
  id: number;
  lastReadAt: string;
  thread: Pick<Thread, 'id' | 'title' | 'page'> & {
    unreadPostId: number;
    unreadPostContent: string;
    unreadPostCreatedAt: string;
  };
}
