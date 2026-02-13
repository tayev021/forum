import type { SearchedAuthor } from '../../../entities/author';
import styled from 'styled-components';
import { Link } from 'react-router';
import { UserAvatar } from '../../../entities/user/ui/UserAvatar';

interface AuthorsProps {
  authors: SearchedAuthor[];
}

const Item = styled.li`
  &:hover {
    color: var(--color-primary);
  }
`;

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem 1rem;
`;

const Name = styled.h5`
  width: 100%;
  font-size: 1.8rem;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export function Authors({ authors }: AuthorsProps) {
  return (
    <>
      {authors.map((author) => (
        <Item key={author.id}>
          <StyledLink to={`/author/${author.id}/profile`}>
            <UserAvatar user={author} size={5} />
            <Name>{author.username}</Name>
          </StyledLink>
        </Item>
      ))}
    </>
  );
}
