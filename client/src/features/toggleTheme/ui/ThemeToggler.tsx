import styled from 'styled-components';
import type { Theme } from '../lib/types/Theme';
import { useTheme } from '../lib/hooks/useTheme';
import { HiMoon, HiSun } from 'react-icons/hi2';

interface ButtonProps {
  $theme: Theme;
}

const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  color: var(--color-emerald-900);
  transition: all linear 0.1s;

  &:hover {
    ${(props) =>
      props.$theme === 'light'
        ? 'color: var(--color-emerald-950);'
        : 'color: var(--color-yellow-700);'}
    transform: scale(1.1);
  }

  svg {
    width: 2rem;
    height: 2rem;
  }

  cursor: pointer;
`;

export function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button $theme={theme} onClick={toggleTheme}>
      {theme === 'light' ? <HiMoon /> : <HiSun />}
    </Button>
  );
}
