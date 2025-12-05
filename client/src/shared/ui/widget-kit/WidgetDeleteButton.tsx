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
  width: 100%;
  height: 100%;
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
