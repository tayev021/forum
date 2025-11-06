import type { ReactElement } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  className?: string;
  children: ReactElement | ReactElement[];
}

const StyledContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;

export function Container({ className, children }: ContainerProps) {
  return <StyledContainer className={className}>{children}</StyledContainer>;
}
