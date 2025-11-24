import { Providers } from './providers';
import { GlobalStyles } from './styles/GlobalStyles';
import { AppRouter } from './routes';
import { Toaster } from '../shared/ui/Toaster';

export function App() {
  return (
    <Providers>
      <GlobalStyles />
      <AppRouter />
      <Toaster />
    </Providers>
  );
}
