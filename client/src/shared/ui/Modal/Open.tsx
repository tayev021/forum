import { cloneElement, type ReactElement } from 'react';
import { useModal } from '../../lib/hooks/useModal';

interface OpenProps {
  children: ReactElement;
  windowName: string;
}

interface ChildElementProps {
  onClick: (modalName: string) => void;
}

export function Open({ children, windowName }: OpenProps) {
  const { open } = useModal();

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    onClick: () => open(windowName),
  });
}
