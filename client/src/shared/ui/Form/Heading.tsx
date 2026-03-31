import type { ReactNode } from 'react';
import styled from 'styled-components';

interface HeadingProps {
  className?: string;
  children: ReactNode;
}

const StyledHeading = styled.h3`
  margin: 0.5rem 0 1rem;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  color: var(--color-primary);
`;

export function Heading({ className = '', children }: HeadingProps) {
  return <StyledHeading className={className}>{children}</StyledHeading>;
}
