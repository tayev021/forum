import type { ReactElement } from 'react';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import { ModalProvider } from './ModalProvider';

interface ProvidersProps {
  children: ReactElement[];
}

export function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <ModalProvider>{children}</ModalProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
