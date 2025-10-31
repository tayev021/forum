import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';

const Header = styled.h1`
  color: var(--color-emerald-500);
`;

export function App() {
  return (
    <div>
      <GlobalStyles />
      <Header>Hello React</Header>
    </div>
  );
}
