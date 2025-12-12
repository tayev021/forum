import {
  InlineModalContext,
  type InlineModalContextType,
} from '../context/InlineModalContext';
import { useContext } from 'react';

export function useInlineModal(): InlineModalContextType {
  const context = useContext(InlineModalContext);

  if (context === undefined)
    throw new Error('useInlineModal must be used within a InlineModalProvider');

  return context as InlineModalContextType;
}
