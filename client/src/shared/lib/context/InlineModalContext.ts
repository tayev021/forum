import { createContext } from 'react';

export interface InlineModalContextType {
  inlineModalName: string;
  open: (inlineModalName: string) => void;
  close: () => void;
}

export const InlineModalContext = createContext<InlineModalContextType | null>(
  null
);
