import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useUserSubscriptions() {
  const { userSubscriptions, isLoading, error } = useAppSelector(
    (state) => state.user
  );

  return { userSubscriptions, isLoading, error };
}
