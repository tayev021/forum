import styled from 'styled-components';
import { Spinner } from '../Spinner';

interface LoaderProps {
  isLoading: boolean;
}

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(4px);
`;

export function Loader({ isLoading = false }: LoaderProps) {
  if (!isLoading) return null;

  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
}
