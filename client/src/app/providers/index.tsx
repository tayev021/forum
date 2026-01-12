import type { ReactElement } from 'react';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import { ModalProvider } from './ModalProvider';
import { InlineModalProvider } from './InlineModalProvider';
import { DropdownProvider } from './DropdownProvider';

interface ProvidersProps {
  children: ReactElement[];
}

export function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <ModalProvider>
          <InlineModalProvider>
            <DropdownProvider>{children}</DropdownProvider>
          </InlineModalProvider>
        </ModalProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
