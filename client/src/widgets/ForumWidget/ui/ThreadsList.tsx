import styled from 'styled-components';
import type { Thread } from '../model/types/Thread';
import { ThreadItem } from './ThreadItem';

interface ThreadsTableProps {
  threads: Thread[];
}

const List = styled.ul`
  padding: 2rem;
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
