import styled, { keyframes } from 'styled-components';

interface ErrorProps {
  message: string;
}

interface StyledErrorProps {
  $isRunning: boolean;
}

interface ErrorContainerProps {
  $hasError?: boolean;
}

const running = keyframes`
  0% { 
    transform: translateX(0); 
  }
  80% { 
    transform: translateX(calc(-100% + 25rem));
  }
  100% { 
    transform: translateX(0); 
  }
`;

const runningShort = keyframes`
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

const ErrorContainer = styled.div<ErrorContainerProps>`
  width: 100%;
  padding: 0.1rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  line-height: 1;
  color: var(--color-text-secondary);
  background-color: var(--color-rose-500);

  ${(props) => (props.$hasError ? '' : 'opacity: 0;')}

  p {
    animation: ${running} 5s linear infinite;
  }
`;

const InputErrorContainer = styled(ErrorContainer)`
  width: 24rem;
  position: absolute;
  bottom: -0.8rem;
  left: 1rem;

  background-color: var(--color-primary);

  p {
    animation: ${runningShort} 5s linear infinite;
  }
`;

const StyledError = styled.div<StyledErrorProps>`
  white-space: nowrap;
  overflow: hidden;

  p {
    ${(props) => (props.$isRunning ? '' : 'animation: none;')};
  }
`;

const Message = styled.p`
  display: inline-block;
  position: relative;
`;

export function Error({ message = '' }: ErrorProps) {
  if (message.length <= 0) return null;

  return (
    <ErrorContainer $hasError={message.length > 0}>
      <StyledError $isRunning={message.length > 36}>
        <Message>{message}</Message>
      </StyledError>
    </ErrorContainer>
  );
}

export function InputError({ message = '' }: ErrorProps) {
  if (message.length <= 0) return null;

  return (
    <InputErrorContainer $hasError={message.length > 0}>
      <StyledError $isRunning={message.length > 33}>
        <Message>{message}</Message>
      </StyledError>
    </InputErrorContainer>
  );
}
