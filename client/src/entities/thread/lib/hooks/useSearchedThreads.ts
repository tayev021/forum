import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useSearchedThreads() {
  const { searchedThreads, isLoading, error } = useAppSelector(
    (state) => state.thread
  );

  return { searchedThreads, isLoading, error };
}
