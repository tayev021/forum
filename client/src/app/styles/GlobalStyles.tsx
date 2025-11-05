import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
:root {
  --color-grey-0: #ffffff;
  --color-grey-50: #fafafa;
  --color-grey-100: #f4f4f5;
  --color-grey-200: #e4e4e7;
  --color-grey-300: #d4d4d8;
  --color-grey-400: #a1a1aa;
  --color-grey-500: #71717a;
  --color-grey-600: #52525b;
  --color-grey-700: #3f3f46;
  --color-grey-800: #27272a;
  --color-grey-900: #18181b;
  --color-grey-950: #09090b;
  --color-grey-999: #000000;

  --color-emerald-50: #ecfdf5;
  --color-emerald-100: #d1fae5;
  --color-emerald-200: #a7f3d0;
  --color-emerald-300: #6ee7b7;
  --color-emerald-400: #34d399;
  --color-emerald-500: #10b981;
  --color-emerald-600: #059669;
  --color-emerald-700: #047857;
  --color-emerald-800: #065f46;
  --color-emerald-900: #064e3b;
  --color-emerald-950: #022c22;

  --color-rose-50: #fff1f2;
  --color-rose-100: #ffe4e6;
  --color-rose-200: #fecdd3;
  --color-rose-300: #fda4af;
  --color-rose-400: #fb7185;
  --color-rose-500: #f43f5e;
  --color-rose-600: #e11d48;
  --color-rose-700: #be123c;
  --color-rose-800: #9f1239;
  --color-rose-900: #881337;
  --color-rose-950: #4c0519;

  --shadow-small: 2px 2px 4px rgba(0,0,0, 0.3)
  --shadow-medium: 4px 4px 8px rgba(0,0,0, 0.3)
  --shadow-large: 5px 5px 10px rgba(0,0,0, 0.3)
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
}

body {
  min-height: 100vh;
  font-family: "Open Sans", sans-serif;
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--color-grey-800);
  background-color: var(--color-grey-50);
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  border: none;
  background: none;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

*:disabled {
  cursor: not-allowed;
}
`;
