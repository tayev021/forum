import type { ReactElement } from 'react';
import styled from 'styled-components';

interface DeleteButtonProps {
  onClick?: () => void;
  children: ReactElement;
}

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-grey-500);
  cursor: pointer;

  &:hover {
    color: var(--color-rose-500);
  }
`;

export function WidgetDeleteButton({ onClick, children }: DeleteButtonProps) {
  return <DeleteButton onClick={onClick}>{children}</DeleteButton>;
}
