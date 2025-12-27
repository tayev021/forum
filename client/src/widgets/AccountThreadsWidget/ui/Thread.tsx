import styled from 'styled-components';
import type { AuthorThread } from '../../../entities/thread';
import { Link } from 'react-router';
import { formatRelativeTime } from '../../../shared/lib/utils/formatRelativeTime';

interface ThreadProps {
  thread: AuthorThread;
}

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: minmax(10rem, 1fr) minmax(9rem, min-content) 7rem 12rem;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 900px) {
    grid-template-columns: minmax(10rem, 1fr) 7rem 12rem;
  }

  @media (max-width: 700px) {
    grid-template-columns: minmax(10rem, 1fr) 12rem;
  }

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

  &:nth-child(2) {
    @media (max-width: 900px) {
      display: none;
    }
  }

  &:nth-child(3) {
    @media (max-width: 700px) {
      display: none;
    }
  }
`;

const Title = styled(Cell)`
  font-size: 1.6rem;
  color: var(--color-text-primary);
`;

const Time = styled(Cell)`
  text-align: end;
`;

export function Thread({ thread }: ThreadProps) {
  return (
    <li>
      <StyledLink to={`/threads/${thread.id}`}>
        <Title>{thread.title}</Title>
        <Cell>
          {thread.views} {thread.views === 1 ? 'view' : 'views'}
        </Cell>
        <Cell>
          {thread.postsCount} {thread.postsCount > 1 ? 'posts' : 'post'}
        </Cell>
        <Time>{formatRelativeTime(thread.createdAt)}</Time>
      </StyledLink>
    </li>
  );
}
