import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function usePost() {
  const { post, isLoading, error } = useAppSelector((state) => state.post);

  return { post, isLoading, error };
}
