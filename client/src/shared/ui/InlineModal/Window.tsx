import { cloneElement, type ReactElement, type Ref } from 'react';
import styled from 'styled-components';
import { useInlineModal } from '../../lib/hooks/useInlineModal';
import { useOutsideClick } from '../../lib/hooks/useOutsideClick';

interface WindowProps {
  name: string;
  children: ReactElement | ReactElement[];
}

interface StyledWindowProps {
  ref: Ref<any>;
}

const StyledWindow = styled.div<StyledWindowProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;

interface ChildElementProps {
  closeModal: () => void;
}

export function Window({ children, name }: WindowProps) {
  const { inlineModalName, close } = useInlineModal();
  const ref = useOutsideClick(close);

  if (name !== inlineModalName) return null;

  return (
    <StyledWindow ref={ref}>
      {cloneElement(children as React.ReactElement<ChildElementProps>, {
        closeModal: close,
      })}
    </StyledWindow>
  );
}
