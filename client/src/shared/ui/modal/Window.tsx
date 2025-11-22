import { cloneElement, type ReactElement, type Ref } from 'react';
import { useModal } from '../../lib/hooks/useModal';
import { useOutsideClick } from '../../lib/hooks/useOutsideClick';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface WindowProps {
  name: string;
  children: ReactElement | ReactElement[];
}

interface StyledWindowProps {
  ref: Ref<any>;
}

interface ChildElementProps {
  closeModal: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(2px);
  transition: all 0.5s;
  z-index: 1000;
`;

const StyledWindow = styled.div<StyledWindowProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s;
`;

export function Window({ children, name }: WindowProps) {
  const { modalName, close } = useModal();
  const ref = useOutsideClick(close);

  if (name !== modalName) return null;

  return createPortal(
    <Overlay>
      <StyledWindow ref={ref}>
        {cloneElement(children as React.ReactElement<ChildElementProps>, {
          closeModal: close,
        })}
      </StyledWindow>
    </Overlay>,
    document.body
  );
}
