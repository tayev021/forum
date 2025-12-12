import styled from 'styled-components';
import { HiPencil } from 'react-icons/hi2';
import { WidgetButton } from './WidgetButton';

interface WidgetEditButtonProps {
  className?: string;
  onClick?: () => void;
}

const Icon = styled(HiPencil)`
  max-width: 1.8rem;
  max-height: 1.8rem;
  min-width: 1rem;
  min-height: 1rem;
`;

export function WidgetEditButton({
  className,
  onClick = () => {},
}: WidgetEditButtonProps) {
  return (
    <WidgetButton className={className} onClick={onClick}>
      <Icon />
    </WidgetButton>
  );
}
