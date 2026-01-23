import type { ReactElement } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

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

const Icon = styled(AiOutlineExclamationCircle)`
  max-width: 1.8rem;
  max-height: 1.8rem;
  min-width: 1rem;
  min-height: 1rem;
`;

export function ReportButton({
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
