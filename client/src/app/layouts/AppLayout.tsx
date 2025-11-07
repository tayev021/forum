import styled from 'styled-components';
import { Outlet } from 'react-router';
import { AppHeader } from './AppHeader';
import { NavBar } from '../../widgets/navbar';
import { AppFooter } from './AppFooter';

const App = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr min-content;
`;

const Main = styled.main`
  min-height: 120rem;
`;

export function AppLayout() {
  return (
    <App>
      <AppHeader />
      <NavBar />
      <Main>
        <Outlet />
      </Main>
      <AppFooter />
    </App>
  );
}
