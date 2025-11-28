import { Link } from 'react-router';
import styled from 'styled-components';

interface ForumLinkProps {
  forum: {
    id: number;
    title: string;
  };
}

const StyledLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

export function ForumLink({ forum }: ForumLinkProps) {
  return (
    <li>
      <StyledLink to={`/forums/${forum.id}?page=1`}>{forum.title}</StyledLink>
    </li>
  );
}
