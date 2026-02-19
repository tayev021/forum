import styled from 'styled-components';

export const Button = styled.button`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: var(--color-secondary);
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
  }
`;
