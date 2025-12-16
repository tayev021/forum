import styled from 'styled-components';
import { Widget } from '../../../shared/ui/WidgetKit';
import { useStatistic } from '../../../entities/statistic';
import { HiChartBar } from 'react-icons/hi2';

const StyledWidgetHeader = styled(Widget.Header)`
  padding: 1rem;
  grid-template-columns: 1fr;
`;

const StyledWidgetTitle = styled(Widget.Title)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1;
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
    <Widget.Container>
      {isLoading && <Widget.Loader />}
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
    </Widget.Container>
  );
}
