import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useAuthorPosts() {
  const { authorPosts, isLoading, error } = useAppSelector(
    (state) => state.post
  );

  return { authorPosts, isLoading, error };
}
