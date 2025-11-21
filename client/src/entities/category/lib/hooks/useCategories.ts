import { useEffect } from 'react';
import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { getCategories } from '../../model/thunks/getCategories';

export function useCategories() {
  const { categories, isLoading } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return { categories, isLoading };
}
