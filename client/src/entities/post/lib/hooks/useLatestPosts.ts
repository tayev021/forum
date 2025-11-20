import { useEffect } from 'react';
import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { getLatestPosts } from '../../model/thunks/getLatestPosts';

export function useLatestPosts() {
  const { latestPosts, isLoading } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLatestPosts());
  }, [dispatch]);

  return { latestPosts, isLoading };
}
