import { type ReactElement } from 'react';
import { useDropdown } from '../../lib/hooks/useDropdown';
import { useOutsideClick } from '../../lib/hooks/useOutsideClick';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface WindowProps {
  name: string;
  className?: string;
  children: ReactElement | ReactElement[];
}

const StyledWindow = styled.div`
  position: absolute;
  box-shadow: var(--shadow-medium);
  z-index: 1000;
`;

export function Window({ name, className = '', children }: WindowProps) {
  const { dropdownName, position, close } = useDropdown();
  const ref = useOutsideClick<HTMLDivElement>(close);

  const bodyRect = document.body.getBoundingClientRect();
  const top = `${window.scrollY + position.y}px`;
  const left =
    position.x + 290 > bodyRect.width
      ? `${Math.round(bodyRect.width - 290)}px`
      : `${Math.round(position.x)}px`;

  if (name !== dropdownName) return null;

  return createPortal(
    <StyledWindow
      ref={ref}
      className={className}
      style={{ top: top, left: left }}
      onClick={() => close()}
    >
      {children}
    </StyledWindow>,
    document.body
  );
}
