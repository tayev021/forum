import styled from 'styled-components';
import { Spinner } from '../Spinner';

interface LoaderProps {
  position?: 'top' | 'center';
}

interface StyledLoaderProps {
  $position: 'top' | 'center';
}

const StyledLoader = styled.div<StyledLoaderProps>`
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

export function Loader({ position = 'center' }: LoaderProps) {
  return (
    <StyledLoader $position={position}>
      <Spinner />
    </StyledLoader>
  );
}
