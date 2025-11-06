import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';
import type { ThemeContextType } from '../types/ThemeContextType';

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error('useThemeContext must be used within a ThemeProvider');

  return context as ThemeContextType;
}
