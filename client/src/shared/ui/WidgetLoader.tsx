import styled from 'styled-components';
import { Spinner } from './Spinner';

const Loader = styled.div`
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

export function WidgetLoader() {
  return (
    <Loader>
      <Spinner />
    </Loader>
  );
}
