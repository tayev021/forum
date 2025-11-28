import styled from 'styled-components';

const Container = styled.div`
  padding: 4rem;
  font-style: italic;
  text-align: center;
  color: var(--color-grey-500);
`;

export function NoThreads() {
  return <Container>No threads yet</Container>;
}
