import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useUserPosts() {
  const { userPosts, isLoading, error } = useAppSelector((state) => state.user);

  return { userPosts, isLoading, error };
}
