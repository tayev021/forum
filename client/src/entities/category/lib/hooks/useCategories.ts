import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useCategories() {
  const { categories, isLoading, error } = useAppSelector(
    (state) => state.category
  );

  return { categories, isLoading, error };
}
