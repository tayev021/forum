import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useUserThreads() {
  const { userThreads, isLoading, error } = useAppSelector(
    (state) => state.user
  );

  return { userThreads, isLoading, error };
}
