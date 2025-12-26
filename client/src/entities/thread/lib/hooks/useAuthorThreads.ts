import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useAuthorThreads() {
  const { authorThreads, isLoading, error } = useAppSelector(
    (state) => state.thread
  );

  return { authorThreads, isLoading, error };
}
