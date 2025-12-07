import styled from 'styled-components';
import { Container } from '../../../shared/ui/Container';
import { CategoriesWidget } from '../../../widgets/CategoriesWidget';
import { StatisticWidget } from '../../../widgets/StatisticWidget';
import { LatestPostsWidget } from '../../../widgets/LatestPostsWidget';

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: minmax(28rem, 1fr) 24rem;
  gap: 2rem;
  padding: 4rem 2rem;
`;

const Main = styled.div``;

const SideBar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export function HomePage() {
  return (
    <StyledContainer>
      <Main>
        <CategoriesWidget />
      </Main>
      <SideBar>
        <StatisticWidget />
        <LatestPostsWidget />
      </SideBar>
    </StyledContainer>
  );
}
