import type { ElementType } from 'react';
import styled from 'styled-components';
import { Container } from '../../../ui/Container';
import { useUser } from '../../../../entities/user';
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
  const { user } = useUser();

  return (
    <>
      <title>{`Forum | ${user?.username} Account`}</title>
      <StyledContainer>
        <NavBar />
        <div>
          <Outlet />
        </div>
      </StyledContainer>
    </>
  );
}
