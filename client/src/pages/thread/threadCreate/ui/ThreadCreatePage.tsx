import styled from 'styled-components';
import { Container } from '../../../../shared/ui/Container';
import { ThreadCreateWidget } from '../../../../widgets/ThreadWidget';

const StyledContainer = styled(Container)`
  padding: 4rem 2rem;

  @media (max-width: 600px) {
    padding: 3rem 1rem;
  }
`;

export function ThreadCreatePage() {
  return (
    <>
      <title>{`Forum | Create Thread`}</title>
      <StyledContainer>
        <ThreadCreateWidget />
      </StyledContainer>
    </>
  );
}
