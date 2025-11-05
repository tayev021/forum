import styled from 'styled-components';

interface ContainerProps {
  className?: string;
  children: React.ReactElement | React.ReactElement[];
}

const StyledContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;

export function Container({ className, children }: ContainerProps) {
  return <StyledContainer className={className}>{children}</StyledContainer>;
}
