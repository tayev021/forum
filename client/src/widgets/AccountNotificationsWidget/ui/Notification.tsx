import type { UserNotification } from '../../../entities/user';
import styled from 'styled-components';
import { Link } from 'react-router';
import { formatRelativeTime } from '../../../shared/lib/utils/formatRelativeTime';

interface NotificationProps {
  notification: UserNotification;
}

const StyledLink = styled(Link)`
  display: block;
  padding: 1rem;
  border: 1px solid var(--color-grey-400);
  border-radius: 0.6rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:not(:last-child) {
    border: 2px solid red;
  }

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const Title = styled.h5`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--color-primary);
  overflow: hidden;
`;

const Time = styled.p`
  font-size: 1.4rem;
  white-space: nowrap;
  color: var(--color-grey-500);
`;

const Content = styled.p`
  word-wrap: break-word;
  overflow: hidden;
`;

export function Notification({ notification }: NotificationProps) {
  return (
    <li>
      <StyledLink
        to={`/threads/${notification.thread.id}#${notification.thread.unreadPostId}`}
      >
        <Header>
          <Title>{notification.thread.title}</Title>
          <Time>
            posted {formatRelativeTime(notification.thread.unreadPostCreatedAt)}
          </Time>
        </Header>
        <Content>{notification.thread.unreadPostContent}</Content>
      </StyledLink>
    </li>
  );
}
