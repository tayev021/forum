import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useForum() {
  const { isLoading, error } = useAppSelector((state) => state.forum);

  return { isLoading, error };
}
