import styled from 'styled-components';
import type { SearchedThread } from '../../../entities/thread';
import { Link } from 'react-router';

interface ThreadsProps {
  threads: SearchedThread[];
}

const Item = styled.li`
  &:hover {
    color: var(--color-primary);
  }
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 1rem;
`;

const Title = styled.h5`
  width: 100%;
  font-size: 1.6rem;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export function Threads({ threads }: ThreadsProps) {
  return (
    <>
      {threads.map((thread) => (
        <Item key={thread.id}>
          <StyledLink to={`/threads/${thread.id}?page=1`}>
            <Title>{thread.title}</Title>
          </StyledLink>
        </Item>
      ))}
    </>
  );
}
