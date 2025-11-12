import type { ReactNode } from 'react';
import styled from 'styled-components';

interface LabelProps {
  htmlFor: string;
  hasValue?: boolean;
  children: ReactNode;
}

interface StyledLabelProps {
  $hasValue: boolean;
}

const StyledLabel = styled.label<StyledLabelProps>`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  padding: 0.1rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  line-height: 1;
  transition: all 0.15s linear;
  cursor: text;

  ${(props) =>
    props.$hasValue
      ? `
        top: -0.2rem;
        left: 1rem !important;
        color: var(--color-text-secondary);
        background-color: var(--color-primary);`
      : ''}
`;

export function Label({ htmlFor, hasValue = false, children }: LabelProps) {
  return (
    <StyledLabel htmlFor={htmlFor} $hasValue={hasValue}>
      {children}
    </StyledLabel>
  );
}
