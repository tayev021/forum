import { useEffect, type ReactElement } from 'react';
import { useLocalStorage } from '../../shared/lib/hooks/useLocalStorage';
import type { Theme } from '../../shared/lib/types/Theme';
import { ThemeContext } from '../../shared/lib/context/ThemeContext';

interface ThemeProviderProps {
  children: ReactElement | ReactElement[];
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>('light', 'theme');

  useEffect(
    function () {
      if (theme === 'light') {
        document.documentElement.className = 'light-theme';
      } else {
        document.documentElement.className = 'dark-theme';
      }
    },
    [theme]
  );

  function toggleTheme() {
    setTheme((currentTheme: Theme) =>
      currentTheme === 'light' ? 'dark' : 'light'
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
