import type { ForumThread } from '../../../entities/forum';
import styled from 'styled-components';
import { ThreadItem } from './ThreadItem';

interface ThreadsTableProps {
  threads: ForumThread[];
}

const List = styled.ul`
  padding: 1rem;
`;

export function ThreadsList({ threads }: ThreadsTableProps) {
  return (
    <List>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </List>
  );
}
