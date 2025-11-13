import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useUser() {
  const { user, isLoading, errors } = useAppSelector((state) => state.user);
  return { user, isLoading, errors };
}
