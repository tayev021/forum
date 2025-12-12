import type { ReactNode } from 'react';
import styled from 'styled-components';

interface WidgetTitleProps {
  className?: string;
  children: ReactNode;
}

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--color-primary);
  overflow: hidden;
`;

export function WidgetTitle({ className, children }: WidgetTitleProps) {
  return <Title className={className}>{children}</Title>;
}
