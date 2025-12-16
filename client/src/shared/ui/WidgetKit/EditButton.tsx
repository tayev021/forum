import styled from 'styled-components';
import { HiPencil } from 'react-icons/hi2';
import { Button } from './Button';

interface EditButtonProps {
  className?: string;
  onClick?: () => void;
}

const Icon = styled(HiPencil)`
  max-width: 1.8rem;
  max-height: 1.8rem;
  min-width: 1rem;
  min-height: 1rem;
`;

export function EditButton({ className, onClick = () => {} }: EditButtonProps) {
  return (
    <Button className={className} onClick={onClick}>
      <Icon />
    </Button>
  );
}
