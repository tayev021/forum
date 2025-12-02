import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

interface BackButtonProps {
  url?: string;
  children: ReactNode;
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function BackHomeButton({ url, children }: BackButtonProps) {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(url || '/')}>{children}</Button>;
}
