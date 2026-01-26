import styled from 'styled-components';
import { Pagination } from '../../../shared/ui/Pagination';
import { useUser } from '../../../entities/user';
import {
  clearReportError,
  getReports,
  useReports,
} from '../../../entities/report';
import { useSearchParams } from 'react-router';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import { Widget } from '../../../shared/ui/WidgetKit';
import toast from 'react-hot-toast';
import { NoReports } from './NoReports';
import { Report } from './Report';

const ReportsList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const StyledPagination = styled(Pagination)`
  margin-top: 2rem;
`;

export function AccountReportsWidget() {
  const { user } = useUser();
  const { reports, isLoading, error: serverError } = useReports();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(getReports({ page }));
  }, [page]);

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearReportError());
    }
  }, [serverError]);

  if (!reports || isLoading) {
    return <Widget.Loader />;
  }

  if (!user) return null;

  return (
    <>
      <Widget.Container>
        <Widget.Header>
          <Widget.Title>Reports</Widget.Title>
        </Widget.Header>
        {reports.list.length < 1 ? (
          <NoReports />
        ) : (
          <ReportsList>
            {reports.list.map((report) => (
              <Report key={report.id} report={report} />
            ))}
          </ReportsList>
        )}
      </Widget.Container>
      <StyledPagination
        baseUrl="/account/reports"
        currentPage={reports.page}
        totalPages={reports.totalPages}
      />
    </>
  );
}
