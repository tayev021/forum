import type { UserNotification } from '../../../entities/user';
import { Notification } from './Notification';

interface NotificationsProps {
  notifications: UserNotification[];
}

export function Notifications({ notifications }: NotificationsProps) {
  return (
    <ul>
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </ul>
  );
}
