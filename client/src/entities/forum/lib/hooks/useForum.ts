import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useForum() {
  const { forum, isLoading, error } = useAppSelector((state) => state.forum);

  return { forum, isLoading, error };
}
