import styled from 'styled-components';
import { HiPlus } from 'react-icons/hi2';
import { Button } from './Button';

interface WidgetCreateButtonProps {
  className?: string;
  onClick?: () => void;
}

const Icon = styled(HiPlus)`
  max-width: 2rem;
  max-height: 2rem;
  min-width: 1rem;
  min-height: 1rem;
`;

export function CreateButton({
  className,
  onClick = () => {},
}: WidgetCreateButtonProps) {
  return (
    <Button className={className} onClick={onClick}>
      <Icon />
    </Button>
  );
}
