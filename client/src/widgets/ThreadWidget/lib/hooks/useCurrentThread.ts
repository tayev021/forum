import { useParams, useSearchParams } from 'react-router';
import {
  clearThreadError,
  getThread,
  useThread,
} from '../../../../entities/thread';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export function useCurrentThread() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { thread, isLoading, error } = useThread();
  const dispatch = useAppDispatch();

  const threadId = Number(params.threadId);
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (error?.type === 'general') {
      toast.error(error.message);
      dispatch(clearThreadError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (threadId) {
      dispatch(getThread({ threadId, page }));
    }
  }, [dispatch, threadId, page]);

  return { thread, isLoading, error };
}
