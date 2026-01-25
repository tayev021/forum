import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useReports() {
  const { reports, isLoading, error } = useAppSelector((state) => state.report);

  return { reports, isLoading, error };
}
