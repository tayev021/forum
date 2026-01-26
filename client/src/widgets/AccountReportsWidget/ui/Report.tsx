import { Link } from 'react-router';
import type { Report } from '../../../entities/report';
import { formatRelativeTime } from '../../../shared/lib/utils/formatRelativeTime';
import { ReportedPost } from './ReportedPost';
import styled from 'styled-components';
import { ReportActions } from './ReportActions';

interface ReportProps {
  report: Report;
}

const StyledReport = styled.li`
  padding: 1rem;
  border-radius: 0.6rem;

  &:hover {
    background-color: var(--color-grey-200);
  }

  &:hover > div:nth-child(2) {
    border: 2px dashed var(--color-rose-500);
    border-radius: 0.6rem;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0 2rem;
  flex-wrap: wrap;
`;

const Heading = styled.h4`
  font-size: 1.8rem;
  color: var(--color-primary);
`;

const Time = styled.p`
  font-size: 1.4rem;
  font-style: italic;
  color: var(--color-grey-500);
`;

const Highlight = styled.span`
  font-weight: 500;
  color: var(--color-yellow-600);
`;

const StyledLink = styled(Link)`
  &:hover {
    color: var(--color-primary);
  }
`;

const Reason = styled.p`
  word-break: break-all;
`;

export function Report({ report }: ReportProps) {
  return (
    <StyledReport>
      <div>
        <Row>
          <Heading>Report #{report.id}</Heading>
          <Time>reported {formatRelativeTime(report.createdAt)}</Time>
        </Row>
        <p>
          <Highlight>By</Highlight>{' '}
          <StyledLink to={`/author/${report.reporter.id}/profile`}>
            {report.reporter.username}
          </StyledLink>
        </p>
        <Reason>
          <Highlight>Reason:</Highlight> {report.reason}
        </Reason>
      </div>
      <ReportedPost post={report.post} />
      <ReportActions report={report} />
    </StyledReport>
  );
}
