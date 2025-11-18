import type { ReactNode } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  className?: string;
  children: ReactNode | ReactNode[];
}

const StyledContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;

export function Container({ className, children }: ContainerProps) {
  return <StyledContainer className={className}>{children}</StyledContainer>;
}
