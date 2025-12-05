import styled from 'styled-components';
import { WidgetHeader } from '../../../shared/ui/widget-kit/WidgetHeader';
import { WidgetTitle } from '../../../shared/ui/widget-kit/WidgetTitle';
import { useStatistic } from '../../../entities/statistic';
import { WidgetContainer } from '../../../shared/ui/widget-kit/WidgetContainer';
import { WidgetLoader } from '../../../shared/ui/widget-kit/WidgetLoader';
import { HiChartBar } from 'react-icons/hi2';

const StyledWidgetHeader = styled(WidgetHeader)`
  padding: 1rem;
`;

const StyledWidgetTitle = styled(WidgetTitle)`
  display: flex;
  gap: 1rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-secondary);
`;

const List = styled.ul`
  padding: 1rem;
`;

const Row = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 0.2rem;
  }
`;

export function StatisticWidget() {
  const { posts, threads, forums, members, isLoading } = useStatistic();

  return (
    <WidgetContainer>
      {isLoading && <WidgetLoader />}
      <StyledWidgetHeader>
        <StyledWidgetTitle>
          <HiChartBar />
          Forum Statistic
        </StyledWidgetTitle>
      </StyledWidgetHeader>
      <List>
        <Row>
          <span>Posts:</span>
          <span>{posts}</span>
        </Row>
        <Row>
          <span>Threads:</span>
          <span>{threads}</span>
        </Row>
        <Row>
          <span>Forums:</span>
          <span>{forums}</span>
        </Row>
        <Row>
          <span>Members:</span>
          <span>{members}</span>
        </Row>
      </List>
    </WidgetContainer>
  );
}
