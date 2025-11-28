import { useParams, useSearchParams } from 'react-router';
import {
  clearForumError,
  getForum,
  useForum,
} from '../../../../entities/forum';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export function useCurrentForum() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { forum, isLoading, error } = useForum();
  const dispatch = useAppDispatch();

  const forumId = Number(params.forumId);
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (error?.type === 'general') {
      toast.error(error.message);
      dispatch(clearForumError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (forumId) {
      dispatch(getForum({ forumId, page }));
    }
  }, [dispatch, forumId, page]);

  return { forum, isLoading, error };
}
