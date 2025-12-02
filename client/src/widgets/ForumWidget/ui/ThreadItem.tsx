import { useNavigate } from 'react-router';
import type { Thread } from '../model/types/Thread';
import styled from 'styled-components';
import { formatRelativeTime } from '../../../shared/lib/utils/formatRelativeTime';

interface ThreadRowProps {
  thread: Thread;
}

const Li = styled.li`
  display: grid;
  grid-template-columns:
    minmax(20rem, 1fr)
    minmax(min-content, 15rem)
    minmax(min-content, 20rem);
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const Cell = styled.div`
  padding: 0 0.5rem;
  font-size: 1.4rem;
  text-align: center;
  white-space: nowrap;
  color: var(--color-grey-500);

  &:not(:last-child) {
    border-right: 1px solid var(--color-grey-400);
  }
`;

const TitleCell = styled(Cell)`
  font-size: 1.6rem;
  text-align: start;
  text-overflow: ellipsis;
  color: var(--color-text-primary);
  overflow: hidden;
`;

export function ThreadItem({ thread }: ThreadRowProps) {
  const navigate = useNavigate();

  return (
    <Li onClick={() => navigate(`/threads/${thread.id}?page=1`)}>
      <TitleCell>{thread.title}</TitleCell>
      <Cell>Posts: {thread.postsCount}</Cell>
      <Cell>{formatRelativeTime(thread.createdAt)}</Cell>
    </Li>
  );
}
