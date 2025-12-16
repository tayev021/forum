import type { ReactNode } from 'react';
import styled from 'styled-components';

interface TitleProps {
  className?: string;
  children: ReactNode;
}

const StyledTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--color-primary);
  overflow: hidden;
`;

export function Title({ className, children }: TitleProps) {
  return <StyledTitle className={className}>{children}</StyledTitle>;
}
