import styled, { keyframes } from 'styled-components';
import spinnerBg from '../assets/spinner-bg.png';

interface SpinnerProps {
  className?: string;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  width: 6rem;
  height: 6rem;
  position: relative;
`;

const SpinnerBackground = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledSpinner = styled.span`
  width: 6rem;
  height: 6rem;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  user-select: none;

  &::before {
    content: '';
    width: 14px;
    height: 14px;
    position: absolute;
    right: 13px;
    bottom: 13px;
    border: 4px solid var(--color-rose-500);
    border-radius: 50%;
  }

  &::after {
    content: '';
    width: 14px;
    height: 14px;
    position: absolute;
    left: 13px;
    top: 13px;
    border: 4px solid var(--color-rose-500);
    border-radius: 50%;
  }
`;

export function Spinner({ className }: SpinnerProps) {
  return (
    <SpinnerContainer className={className}>
      <SpinnerBackground src={spinnerBg} />
      <StyledSpinner />
    </SpinnerContainer>
  );
}
