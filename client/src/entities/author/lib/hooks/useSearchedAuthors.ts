import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useSearchedAuthors() {
  const { searchedAuthors, isLoading, error } = useAppSelector(
    (state) => state.author
  );

  return { searchedAuthors, isLoading, error };
}
