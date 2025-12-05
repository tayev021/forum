import styled from 'styled-components';
import { HiArrowLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import { WidgetButton } from './WidgetButton';

interface BackButtonProps {
  className?: string;
  url?: string;
}

const Icon = styled(HiArrowLeft)`
  width: 100%;
  height: 100%;
`;

export function WidgetBackButton({ className, url }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <WidgetButton className={className} onClick={() => navigate(url || '/')}>
      <Icon />
    </WidgetButton>
  );
}
