import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useUserNotifications() {
  const { userNotifications, isLoading, error } = useAppSelector(
    (state) => state.user
  );

  return { userNotifications, isLoading, error };
}
