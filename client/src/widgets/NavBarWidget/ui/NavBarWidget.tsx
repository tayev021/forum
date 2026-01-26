import styled from 'styled-components';
import { Container } from '../../../shared/ui/Container';
import { useUser } from '../../../entities/user';
import { NavList } from './NavList';
import { AccountPanel } from './AccountPanel';
import { AuthPanel } from './AuthPanel';
import { ThemeToggler } from '../../../features/toggleTheme';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  background-color: var(--color-primary);
  box-shadow: var(--shadow-bottom-medium);
  z-index: 100;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 1rem 1.6rem;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export function NavBarWidget() {
  const { user, isLoading } = useUser();

  return (
    <Nav>
      <StyledContainer>
        <NavList />
        <Group>
          {isLoading ? null : user ? <AccountPanel /> : <AuthPanel />}
          <ThemeToggler />
        </Group>
      </StyledContainer>
    </Nav>
  );
}
