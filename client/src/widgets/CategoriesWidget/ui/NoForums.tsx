import styled from 'styled-components';

const Container = styled.li`
  padding: 0.5rem 1rem;
  font-style: italic;
  text-align: center;
  color: var(--color-grey-500);
`;

export function NoForums() {
  return <Container>No forums yet</Container>;
}
