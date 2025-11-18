import styled from 'styled-components';
import { useStatistic } from '../../../entities/statistic';
import { HiChartBar } from 'react-icons/hi2';
import { Loader } from './Loader';

const WidgetContainer = styled.div`
  position: relative;
  border: 1px solid var(--color-grey-300);
  border-radius: 0.4rem;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-400);
  line-height: 1;
`;

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
      {isLoading && <Loader />}
      <Header>
        <HiChartBar />
        <Heading>Forum Statistic</Heading>
      </Header>
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
