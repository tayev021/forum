import styled from 'styled-components';
import { Container } from '../../../shared/ui/Container';
import { NavList } from './NavList';
import { AuthPanel } from './AuthPanel';
import { ThemeToggler } from '../../../shared/ui/ThemeToggler';

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
  padding: 1rem 1.6rem;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export function NavBar() {
  return (
    <Nav>
      <StyledContainer>
        <NavList />
        <Group>
          <AuthPanel />
          <ThemeToggler />
        </Group>
      </StyledContainer>
    </Nav>
  );
}
