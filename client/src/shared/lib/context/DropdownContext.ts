import { createContext } from 'react';
import type { Position } from '../../types/Position';

export interface DropdownContextType {
  dropdownName: string;
  position: Position;
  open: (dropdownName: string) => void;
  close: () => void;
  setPosition: (position: Position) => void;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);
