import type { ReactElement } from 'react';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import { ModalProvider } from './ModalProvider';
import { InlineModalProvider } from './InlineModalProvider';

interface ProvidersProps {
  children: ReactElement[];
}

export function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <ModalProvider>
          <InlineModalProvider>{children}</InlineModalProvider>
        </ModalProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
