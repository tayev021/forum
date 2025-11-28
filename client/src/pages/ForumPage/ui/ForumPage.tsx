import styled from 'styled-components';
import { Container } from '../../../shared/ui/Container';
import { ForumWidget } from '../../../widgets/ForumWidget';

const StyledContainer = styled(Container)`
  padding: 4rem 2rem;
`;

export function ForumPage() {
  return (
    <StyledContainer>
      <ForumWidget />
    </StyledContainer>
  );
}
