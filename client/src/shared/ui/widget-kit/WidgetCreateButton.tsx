import styled from 'styled-components';
import { HiPlus } from 'react-icons/hi2';
import { WidgetButton } from './WidgetButton';

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
}

const Icon = styled(HiPlus)`
  width: 100%;
  height: 100%;
`;

export function WidgetCreateButton({
  className,
  onClick = () => {},
}: BackButtonProps) {
  return (
    <WidgetButton className={className} onClick={onClick}>
      <Icon />
    </WidgetButton>
  );
}
