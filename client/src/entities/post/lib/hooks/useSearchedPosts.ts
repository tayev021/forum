import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useSearchedPosts() {
  const { searchedPosts, isLoading, error } = useAppSelector(
    (state) => state.post
  );

  return { searchedPosts, isLoading, error };
}
