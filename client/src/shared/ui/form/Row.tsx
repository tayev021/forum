import type { ReactElement } from 'react';
import styled from 'styled-components';

interface RowProps {
  hasError?: boolean;
  children: ReactElement | ReactElement[];
}

interface StyledRow {
  $hasError: boolean;
}

const StyledRow = styled.div<StyledRow>`
  ${(props) =>
    props.$hasError ? '--color-primary: var(--color-rose-500);' : ''}

  position: relative;

  svg {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    color: var(--color-primary);
  }

  &:has(svg) input {
    padding-left: 4rem;
  }

  &:has(svg) label {
    left: 4rem;
  }

  &:has(label) input::placeholder {
    opacity: 0;
  }

  &:has(input:focus) label {
    top: -0.2rem;
    left: 1rem;
    color: var(--color-text-secondary);
    background-color: var(--color-primary);
  }
`;

export function Row({ hasError = false, children }: RowProps) {
  return <StyledRow $hasError={hasError}>{children}</StyledRow>;
}
