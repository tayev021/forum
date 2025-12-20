import type { ReactNode } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { signout } from '../../../entities/user';
import styled from 'styled-components';

interface SignoutProps {
  className?: string;
  children: ReactNode | ReactNode[];
}

const Button = styled.button`
  cursor: pointer;
`;

export function Signout({ className = '', children }: SignoutProps) {
  const dispatch = useAppDispatch();

  return (
    <Button className={className} onClick={() => dispatch(signout())}>
      {children}
    </Button>
  );
}
