import styled from 'styled-components';
import { HiPencil } from 'react-icons/hi2';
import { Button } from './Button';
import type { ReactElement } from 'react';

interface EditButtonProps {
  className?: string;
  onClick?: () => void;
  children?: ReactElement;
}

const Icon = styled(HiPencil)`
  max-width: 1.8rem;
  max-height: 1.8rem;
  min-width: 1rem;
  min-height: 1rem;
`;

export function EditButton({
  className,
  onClick = () => {},
  children,
}: EditButtonProps) {
  return (
    <Button className={className} onClick={onClick}>
      {children ? children : <Icon />}
    </Button>
  );
}
