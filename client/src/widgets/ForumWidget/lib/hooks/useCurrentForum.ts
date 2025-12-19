import { useParams, useSearchParams } from 'react-router';
import {
  clearForumError,
  getForum,
  sortKeys,
  sortOrders,
  useForum,
  type SortKey,
  type SortOrder,
} from '../../../../entities/forum';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export function useCurrentForum() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { forum, isLoading, error } = useForum();
  const dispatch = useAppDispatch();

  const forumId = Number(params.forumId);
  const page = Number(searchParams.get('page')) || 1;
  const sortKey = searchParams.get('sortKey') as SortKey;
  const sortOrder = searchParams.get('sortOrder') as SortOrder;

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (!sortKey || !sortKeys.includes(sortKey)) {
      newSearchParams.set('sortKey', sortKeys[0]);
    }

    if (!sortOrder || !sortOrders.includes(sortOrder)) {
      newSearchParams.set('sortOrder', sortOrders[1]);
    }

    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams, sortKey, sortOrder]);

  useEffect(() => {
    if (error?.type === 'general') {
      toast.error(error.message);
      dispatch(clearForumError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (forumId) {
      dispatch(getForum({ forumId, page, sortKey, sortOrder }));
    }
  }, [dispatch, forumId, page, sortKey, sortOrder]);

  return { forum, isLoading, error };
}
