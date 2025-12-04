import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function usePost() {
  const { isLoading, error } = useAppSelector((state) => state.post);

  return { isLoading, error };
}
