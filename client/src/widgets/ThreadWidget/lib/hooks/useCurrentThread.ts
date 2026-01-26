import { useParams, useSearchParams } from 'react-router';
import { getThread, useThread } from '../../../../entities/thread';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import { getUserNotifications } from '../../../../entities/user';

export function useCurrentThread() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { thread, isLoading, error } = useThread();
  const dispatch = useAppDispatch();

  const threadId = Number(params.threadId);

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;

    if (threadId !== thread?.id || page !== thread?.page) {
      dispatch(getThread({ threadId, page }));
    }
  }, [dispatch, thread, threadId, searchParams]);

  useEffect(() => {
    if (thread?.isSubscribed) {
      dispatch(getUserNotifications({ page: 1 }));
    }
  }, [dispatch, thread]);

  return { thread, isLoading, error };
}
