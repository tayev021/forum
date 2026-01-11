import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  font-style: italic;
  text-align: center;
  color: var(--color-grey-500);
`;
export function NoSubscriptions() {
  return <Container>You have no threads yet</Container>;
}
