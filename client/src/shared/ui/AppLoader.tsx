import styled from 'styled-components';
import { Spinner } from './Spinner';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg);
  overflow: hidden;
`;

export function AppLoader() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}
