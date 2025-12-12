import styled from 'styled-components';
import type { ReactElement } from 'react';
import { WidgetButton } from './WidgetButton';
import { HiOutlineTrash } from 'react-icons/hi2';

interface DeleteButtonProps {
  className?: string;
  onClick?: () => void;
  children?: ReactElement;
}

const Button = styled(WidgetButton)`
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

export function WidgetDeleteButton({
  className,
  onClick = () => {},
  children,
}: DeleteButtonProps) {
  return (
    <Button className={className} onClick={onClick}>
      {children || <Icon />}
    </Button>
  );
}
