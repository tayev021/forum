import styled from 'styled-components';
import { useStatistic } from '../../../entities/statistic';
import { WidgetContainer } from '../../../shared/ui/widget-kit/WidgetContainer';
import { WidgetHeader } from '../../../shared/ui/widget-kit/WidgetHeader';
import { HiChartBar } from 'react-icons/hi2';
import { WidgetLoader } from '../../../shared/ui/widget-kit/WidgetLoader';

const Heading = styled.h4`
  font-size: 1.6rem;
  font-weight: 500;
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
      <WidgetHeader>
        <HiChartBar />
        <Heading>Forum Statistic</Heading>
      </WidgetHeader>
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
