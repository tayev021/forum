import {
  banUser,
  clearReportError,
  useReports,
  type Report,
} from '../../../entities/report';
import { cloneElement, useEffect, type ReactElement } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

interface BanUserProps {
  report: Report;
  children: ReactElement;
  closeModal?: () => void;
}

interface ChildElementProps {
  confirm: () => void;
  closeModal?: () => void;
}

export function BanUser({
  report,
  children,
  closeModal = () => {},
}: BanUserProps) {
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

  function confirm() {
    dispatch(banUser({ reportId: report.id, page: newPage }));
    navigate(`/account/reports?page=${newPage}`);
  }

  return cloneElement(children as ReactElement<ChildElementProps>, {
    closeModal,
    confirm,
  });
}
