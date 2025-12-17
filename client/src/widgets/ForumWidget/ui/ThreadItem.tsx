import { useNavigate } from 'react-router';
import type { Thread } from '../model/types/Thread';
import styled from 'styled-components';
import { formatRelativeTime } from '../../../shared/lib/utils/formatRelativeTime';

interface ThreadRowProps {
  thread: Thread;
}

const Li = styled.li`
  display: grid;
  grid-template-columns: minmax(20rem, 1fr) minmax(9rem, min-content) 7rem 12rem;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
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

const TitleCell = styled(Cell)`
  font-size: 1.6rem;
  color: var(--color-text-primary);
`;

const TimeCell = styled(Cell)`
  text-align: end;
`;

export function ThreadItem({ thread }: ThreadRowProps) {
  const navigate = useNavigate();

  return (
    <Li onClick={() => navigate(`/threads/${thread.id}?page=1`)}>
      <TitleCell>{thread.title}</TitleCell>
      <Cell>
        {thread.views} {thread.views === 1 ? 'view' : 'views'}
      </Cell>
      <Cell>
        {thread.postsCount} {thread.postsCount > 1 ? 'posts' : 'post'}
      </Cell>
      <TimeCell>{formatRelativeTime(thread.createdAt)}</TimeCell>
    </Li>
  );
}
