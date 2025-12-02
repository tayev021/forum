import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useThread() {
  const { thread, isLoading, error } = useAppSelector((state) => state.thread);

  return { thread, isLoading, error };
}
