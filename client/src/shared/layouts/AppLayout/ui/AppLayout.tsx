import styled from 'styled-components';
import { Outlet } from 'react-router';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import type { ElementType } from 'react';

interface AppLayoutProps {
  NavBar: ElementType;
}

const App = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr min-content;
`;

export function AppLayout({ NavBar }: AppLayoutProps) {
  return (
    <App>
      <AppHeader />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <AppFooter />
    </App>
  );
}
