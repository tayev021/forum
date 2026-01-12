import { useContext } from 'react';
import {
  DropdownContext,
  type DropdownContextType,
} from '../context/DropdownContext';

export function useDropdown(): DropdownContextType {
  const context = useContext(DropdownContext);

  if (context === undefined)
    throw new Error('useDropdown must be used within a DropdownProvider');

  return context as DropdownContextType;
}
