import styled from 'styled-components';
import { Container } from '../../../../shared/ui/Container';
import { AuthorProfileWidget } from '../../../../widgets/AuthorProfileWidget';

const StyledContainer = styled(Container)`
  padding: 4rem 2rem;

  @media (max-width: 600px) {
    padding: 3rem 1rem;
  }
`;

export function AuthorProfilePage() {
  return (
    <StyledContainer>
      <AuthorProfileWidget />
    </StyledContainer>
  );
}
