import type { ReactNode } from 'react';
import styled from 'styled-components';

interface HeadingProps {
  children: ReactNode;
}

const H3 = styled.h3`
  margin: 0.5rem 0 1rem;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  color: var(--color-primary);
`;

export function Heading({ children }: HeadingProps) {
  return <H3>{children}</H3>;
}
