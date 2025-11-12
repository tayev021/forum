import type { ReactNode } from 'react';
import styled from 'styled-components';

interface SubmitProps {
  disabled?: boolean;
  children: ReactNode;
}

const Button = styled.button`
  width: 100%;
  padding: 0.2rem;
  border-radius: 0.6rem;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  background-color: var(--color-primary);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-small);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export function Submit({ disabled = false, children }: SubmitProps) {
  return (
    <Button type="submit" disabled={disabled}>
      {children}
    </Button>
  );
}
