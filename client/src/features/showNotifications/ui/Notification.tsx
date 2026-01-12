import type { UserNotification } from '../../../entities/user';
import styled from 'styled-components';
import { Link } from 'react-router';
import { formatRelativeTime } from '../../../shared/lib/utils/formatRelativeTime';

interface NotificationProps {
  notification: UserNotification;
}

const StyledLink = styled(Link)`
  display: block;
  padding: 0.5rem;
  border-radius: 0.4rem;
  line-height: 1.2;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const Title = styled.h4`
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--color-primary);
  overflow: hidden;
`;

const Time = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  color: var(--color-grey-500);
`;

const Content = styled.p`
  font-size: 1.4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export function Notification({ notification }: NotificationProps) {
  return (
    <li>
      <StyledLink to={`/threads/${notification.thread.id}`}>
        <Title>{notification.thread.title}</Title>
        <Time>
          {formatRelativeTime(notification.thread.unreadPostCreatedAt)}
        </Time>
        <Content>{notification.thread.unreadPostContent}</Content>
      </StyledLink>
    </li>
  );
}
