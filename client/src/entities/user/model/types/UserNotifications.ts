import type { UserNotification } from './UserNotification';

export interface UserNotifications {
  notifications: UserNotification[];
  totalNotifications: number;
  page: number;
  totalPages: number;
}
