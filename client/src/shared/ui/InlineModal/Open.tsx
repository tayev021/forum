import { cloneElement, type ReactElement } from 'react';
import { useInlineModal } from '../../lib/hooks/useInlineModal';

interface OpenProps {
  children: ReactElement;
  windowName: string;
}

interface ChildElementProps {
  onClick: (inlineModalName: string) => void;
}

export function Open({ children, windowName }: OpenProps) {
  const { open } = useInlineModal();

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    onClick: () => open(windowName),
  });
}
