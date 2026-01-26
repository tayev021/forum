import styled from 'styled-components';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

interface ErrorProps {
  children: string;
}

const StyledError = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-rose-900);
  background-color: color-mix(in srgb, var(--color-rose-500) 40%, transparent);
  backdrop-filter: blur(4px);
  z-index: 10;
`;

const Heading = styled.h4`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.8rem;
  font-weight: 500;
`;

export function Error({ children }: ErrorProps) {
  return (
    <StyledError>
      <Heading>
        <HiOutlineExclamationTriangle /> Error
      </Heading>
      <p>{children}</p>
    </StyledError>
  );
}
