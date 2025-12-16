import styled from 'styled-components';
import { HiArrowLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import { Button } from './Button';

interface BackButtonProps {
  className?: string;
  url?: string;
}

const Icon = styled(HiArrowLeft)`
  width: 100%;
  height: 100%;
`;

export function BackButton({ className, url }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <Button className={className} onClick={() => navigate(url || '/')}>
      <Icon />
    </Button>
  );
}
