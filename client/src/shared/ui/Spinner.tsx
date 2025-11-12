import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.span`
  width: 6rem;
  height: 6rem;
  display: inline-block;
  position: relative;
  border: 4px solid var(--color-rose-500);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  user-select: none;

  &::before {
    content: '';
    width: 14px;
    height: 14px;
    position: absolute;
    right: 7px;
    bottom: 7px;
    border: 4px solid var(--color-rose-500);
    border-radius: 50%;
  }

  &::after {
    content: '';
    width: 14px;
    height: 14px;
    position: absolute;
    left: 7px;
    top: 7px;
    border: 4px solid var(--color-rose-500);
    border-radius: 50%;
  }
`;

export function Spinner() {
  return <StyledSpinner></StyledSpinner>;
}
