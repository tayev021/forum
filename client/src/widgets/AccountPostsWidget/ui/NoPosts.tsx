import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  border: 1px solid var(--color-grey-300);
  box-shadow: var(--shadow-small);
  font-style: italic;
  text-align: center;
  color: var(--color-grey-500);
  background-color: var(--color-bg-secondary);
`;

export function NoPosts() {
  return <Container>You have no posts yet</Container>;
}
