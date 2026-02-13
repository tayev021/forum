import { Link } from 'react-router';
import { HiHome } from 'react-icons/hi2';
import styled from 'styled-components';

const StyledNavList = styled.ul`
  display: flex;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 1;
  color: var(--color-white);
  transition: all linear 0.1s;

  &:hover {
    color: var(--color-text-tertiary);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.5rem;
  }
`;

export function NavList() {
  return (
    <StyledNavList>
      <li>
        <StyledLink to="/">
          <HiHome />
          Home
        </StyledLink>
      </li>
    </StyledNavList>
  );
}
