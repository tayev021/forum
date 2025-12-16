import type { ReactElement } from 'react';
import styled from 'styled-components';

interface HeaderGroupProps {
  className?: string;
  children: ReactElement | false | (ReactElement | false)[];
}

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
`;

export function HeaderGroup({ className, children }: HeaderGroupProps) {
  if (!children) return null;

  return <Group className={className}>{children}</Group>;
}
