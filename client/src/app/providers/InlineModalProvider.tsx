import { useState, type ReactElement } from 'react';
import { InlineModalContext } from '../../shared/lib/context/InlineModalContext';

interface InlineModalProviderProps {
  children: ReactElement | ReactElement[];
}

export function InlineModalProvider({ children }: InlineModalProviderProps) {
  const [inlineModalName, setInlineModalName] = useState('');

  const open = setInlineModalName;
  const close = () => setInlineModalName('');

  return (
    <InlineModalContext.Provider value={{ inlineModalName, open, close }}>
      {children}
    </InlineModalContext.Provider>
  );
}
