import styled from 'styled-components';
import { Container } from '../../../shared/ui/Container';
import { useUser } from '../../../entities/user';
import { NavList } from './NavList';
import { Search } from '../../../features/search';
import { AccountPanel } from './AccountPanel';
import { AuthPanel } from './AuthPanel';
import { ThemeToggler } from '../../../features/toggleTheme';

const NavBar = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--color-primary);
  box-shadow: var(--shadow-bottom-medium);
  z-index: 100;
`;

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: min-content minmax(20rem, 30rem) minmax(
      min-content,
      max-content
    );
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 1rem 1.6rem;

  @media (max-width: 600px) {
    grid-template-columns: min-content 1fr;
    padding: 1rem 0.5rem;
    gap: 2rem 1rem;
  }
`;

const StyledSearch = styled(Search)`
  @media (max-width: 600px) {
    grid-area: 2/1/3/3;
  }
`;

const Group = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (max-width: 600px) {
    justify-self: end;
    gap: 1rem;
  }
`;

export function NavBarWidget() {
  const { user, isLoading } = useUser();

  return (
    <NavBar>
      <StyledContainer>
        <NavList />
        <StyledSearch />
        <Group>
          {isLoading ? null : user ? <AccountPanel /> : <AuthPanel />}
          <ThemeToggler />
        </Group>
      </StyledContainer>
    </NavBar>
  );
}
