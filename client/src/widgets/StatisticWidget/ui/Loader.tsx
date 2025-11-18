import styled from 'styled-components';
import { Spinner } from '../../../shared/ui/Spinner';

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
`;

export function Loader() {
  return (
    <StyledLoader>
      <Spinner />
    </StyledLoader>
  );
}
