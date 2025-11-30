import styled from 'styled-components';
import { Spinner } from '../Spinner';

interface WidgetLoaderProps {
  position?: 'top' | 'center';
}

interface LoaderProps {
  $position: 'top' | 'center';
}

const Loader = styled.div<LoaderProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  ${(props) => props.$position === 'center' && 'align-items: center;'}
  ${(props) => props.$position === 'top' && 'padding-top: 2rem;'}
  backdrop-filter: blur(4px);
  z-index: 10;
`;

export function WidgetLoader({ position = 'center' }: WidgetLoaderProps) {
  return (
    <Loader $position={position}>
      <Spinner />
    </Loader>
  );
}
