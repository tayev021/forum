import { createContext } from 'react';
import type { Theme } from '../types/Theme';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
