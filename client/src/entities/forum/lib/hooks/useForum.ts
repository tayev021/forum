import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useForum() {
  const { isLoading } = useAppSelector((state) => state.forum);

  return { isLoading };
}
