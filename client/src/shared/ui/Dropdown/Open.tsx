import { cloneElement, type MouseEvent, type ReactElement } from 'react';
import { useDropdown } from '../../lib/hooks/useDropdown';

interface OpenProps {
  windowName: string;
  children: ReactElement;
}

interface ChildElementProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Open({ windowName, children }: OpenProps) {
  const { dropdownName, open, close, setPosition } = useDropdown();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (
      'closest' in event.target &&
      event.target['closest'] instanceof Function
    ) {
      const closestButton = event.target.closest('button');

      if (closestButton) {
        const rect = closestButton.getBoundingClientRect();

        if (dropdownName !== windowName) {
          open(windowName);

          setPosition({
            x: rect.x,
            y: rect.y + rect.height,
          });
        } else {
          close();
        }
      }
    }
  }

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    onClick: handleClick,
  });
}
