import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

interface StoreProviderProps {
  children: ReactElement | ReactElement[];
}

export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
