import styled from 'styled-components';
import { Container } from '../../../../shared/ui/Container';
import { ThreadWidget } from '../../../../widgets/ThreadWidget';

const StyledContainer = styled(Container)`
  padding: 4rem 2rem;
`;

export function ThreadPage() {
  return (
    <StyledContainer>
      <ThreadWidget />
    </StyledContainer>
  );
}
