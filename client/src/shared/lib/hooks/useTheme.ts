import { useContext } from 'react';

import { ThemeContext, type ThemeContextType } from '../context/ThemeContext';

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error('useThemeContext must be used within a ThemeProvider');

  return context as ThemeContextType;
}
