import styled from 'styled-components';
import { Container } from '../../../ui/Container';
import type { ElementType } from 'react';
import { Outlet } from 'react-router';

interface AccountLayoutProps {
  NavBar: ElementType;
}

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: 20rem minmax(30rem, 1fr);
  gap: 2rem;
  padding: 4rem 2rem;
`;

export function AccountLayout({ NavBar }: AccountLayoutProps) {
  return (
    <StyledContainer>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </StyledContainer>
  );
}
