import { useEffect } from 'react';
import { useAppSelector } from '../../../shared/lib/hooks/useAppSelector';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { getStatistic } from '../model/thunks/getStatistic';

export function useStatistic() {
  const { posts, threads, forums, members, isLoading } = useAppSelector(
    (state) => state.statistic
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStatistic());
  }, [dispatch]);

  return { posts, threads, forums, members, isLoading };
}
