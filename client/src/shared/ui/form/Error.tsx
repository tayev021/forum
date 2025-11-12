import styled, { keyframes } from 'styled-components';

interface ErrorProps {
  message: string;
}

interface StyledErrorProps {
  $isRunning: boolean;
}

const runningLine = keyframes`
  0% { 
    transform: translateX(0); 
  }

  80% { 
    transform: translateX(calc(-100% + 22rem)); 
  }

  100% { 
    transform: translateX(0); 
  }
`;

const ErrorContainer = styled.div`
  width: 24rem;
  position: absolute;
  top: 100%;
  left: 1rem;
  transform: translateY(-40%);
  padding: 0.1rem 0.6rem;
  border-radius: 0.4rem;
  background-color: var(--color-primary);
  font-size: 1.4rem;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledError = styled.p<StyledErrorProps>`
  display: inline-block;
  position: relative;

  color: var(--color-text-secondary);
  animation: ${runningLine} 5s linear infinite;
  ${(props) => (props.$isRunning ? '' : 'animation: none;')};
`;

export function Error({ message = '' }: ErrorProps) {
  if (message.length <= 0) return null;

  return (
    <ErrorContainer>
      <StyledError $isRunning={message.length > 29}>
        <span>{message}</span>
      </StyledError>
    </ErrorContainer>
  );
}
