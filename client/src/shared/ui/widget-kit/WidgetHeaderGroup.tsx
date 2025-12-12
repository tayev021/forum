import type { ReactElement } from 'react';
import styled from 'styled-components';

interface WidgetHeaderGroupProps {
  className?: string;
  children: ReactElement | false | (ReactElement | false)[];
}

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
`;

export function WidgetHeaderGroup({
  className,
  children,
}: WidgetHeaderGroupProps) {
  if (!children) return null;

  return <Group className={className}>{children}</Group>;
}
