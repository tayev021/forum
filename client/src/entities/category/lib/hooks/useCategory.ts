import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useCategory() {
  const { isLoading, error } = useAppSelector((state) => state.category);

  return { isLoading, error };
}
