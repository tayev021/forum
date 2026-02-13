import styled from 'styled-components';
import { HiIdentification, HiKey } from 'react-icons/hi2';
import { Link } from 'react-router';

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1;
  white-space: nowrap;
  color: var(--color-white);
  transition: all linear 0.1s;

  &:hover {
    color: var(--color-text-tertiary);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

export function AuthPanel() {
  return (
    <>
      <StyledLink to="/auth/signin">
        <HiKey />
        Sign in
      </StyledLink>
      <StyledLink to="/auth/signup">
        <HiIdentification />
        Sign up
      </StyledLink>
    </>
  );
}
