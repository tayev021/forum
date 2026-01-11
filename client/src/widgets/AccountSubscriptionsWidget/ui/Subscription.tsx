import styled from 'styled-components';
import type { UserSubscription } from '../../../entities/user';
import { Link } from 'react-router';
import { formatRelativeTime } from '../../../shared/lib/utils/formatRelativeTime';

interface SubscriptionProps {
  subscription: UserSubscription;
}

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: minmax(11rem, 1fr) 20rem;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const Cell = styled.div`
  font-size: 1.4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--color-grey-500);
  overflow: hidden;
`;

const Title = styled(Cell)`
  font-size: 1.6rem;
  color: var(--color-text-primary);
`;

export function Subscription({ subscription }: SubscriptionProps) {
  return (
    <li>
      <StyledLink to={`/threads/${subscription.thread.id}`}>
        <Title>{subscription.thread.title}</Title>
        <Cell>subscribed {formatRelativeTime(subscription.createdAt)}</Cell>
      </StyledLink>
    </li>
  );
}
