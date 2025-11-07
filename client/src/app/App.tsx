import { Providers } from './providers';
import { GlobalStyles } from './styles/GlobalStyles';
import { AppRouter } from './routes';

export function App() {
  return (
    <Providers>
      <GlobalStyles />
      <AppRouter />
    </Providers>
  );
}
