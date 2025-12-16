import styled from 'styled-components';
import type { ReactElement } from 'react';
import { Button } from './Button';
import { HiOutlineTrash } from 'react-icons/hi2';

interface DeleteButtonProps {
  className?: string;
  onClick?: () => void;
  children?: ReactElement;
}

const StyledButton = styled(Button)`
  &:hover {
    color: var(--color-rose-500);
  }
`;

const Icon = styled(HiOutlineTrash)`
  max-width: 1.8rem;
  max-height: 1.8rem;
  min-width: 1rem;
  min-height: 1rem;
`;

export function DeleteButton({
  className,
  onClick = () => {},
  children,
}: DeleteButtonProps) {
  return (
    <StyledButton className={className} onClick={onClick}>
      {children || <Icon />}
    </StyledButton>
  );
}
