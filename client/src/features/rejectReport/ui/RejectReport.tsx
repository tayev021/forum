import { cloneElement, useEffect, type ReactElement } from 'react';
import {
  clearReportError,
  rejectReport,
  useReports,
  type Report,
} from '../../../entities/report';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

interface RejectReportProps {
  report: Report;
  children: ReactElement;
}

interface ChildElementProps {
  onClick: () => void;
}

export function RejectReport({ report, children }: RejectReportProps) {
  const { reports, isLoading, error: serverError } = useReports();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let newPage = 1;

  if (reports) {
    newPage =
      reports.list.length > 1
        ? reports.page
        : reports.page <= 1
          ? 1
          : reports.page - 1;
  }
  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearReportError());
    }
  }, [serverError, isLoading]);

  function onClick() {
    dispatch(rejectReport({ reportId: report.id, page: newPage }));
    navigate(`/account/reports?page=${newPage}`);
  }

  return cloneElement(children as ReactElement<ChildElementProps>, {
    onClick,
  });
}
