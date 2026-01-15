import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';

export function useAuthor() {
  const { author, isLoading, error } = useAppSelector((state) => state.author);

  return { author, isLoading, error };
}
