import { useState, type ReactElement } from 'react';
import { DropdownContext } from '../../shared/lib/context/DropdownContext';
import type { Position } from '../../shared/types/Position';

interface DropdownProviderProps {
  children: ReactElement | ReactElement[];
}

export function DropdownProvider({ children }: DropdownProviderProps) {
  const [dropdownName, setDropdownName] = useState('');
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const open = setDropdownName;
  const close = () => setDropdownName('');

  return (
    <DropdownContext.Provider
      value={{ dropdownName, position, open, close, setPosition }}
    >
      {children}
    </DropdownContext.Provider>
  );
}
