import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { HiArrowLeft } from 'react-icons/hi2';

const StyledContainer = styled.div`
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 8rem auto;
`;

const Heading = styled.h3`
  margin-bottom: 1rem;
  font-size: 2rem;
  color: var(--color-primary);
`;

const Text = styled.p`
  margin-bottom: 2rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 2px solid transparent;
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
  }
`;

export function PageNotFound() {
  const navigate = useNavigate();

  return (
    <>
      <title>{`Forum | Page Not Found`}</title>
      <StyledContainer>
        <Heading>Page Not Found</Heading>
        <Text>Oops! The page you're looking for doesn't exist.</Text>
        <Button onClick={() => navigate('/')}>
          <HiArrowLeft /> Go back to Home Page
        </Button>
      </StyledContainer>
    </>
  );
}
