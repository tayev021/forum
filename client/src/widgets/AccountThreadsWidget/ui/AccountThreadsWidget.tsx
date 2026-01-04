import styled from 'styled-components';
import { Widget } from '../../../shared/ui/WidgetKit';
import {
  getUserThreads,
  useUser,
  useUserThreads,
} from '../../../entities/user';
import { useSearchParams } from 'react-router';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import { Pagination } from '../../../shared/ui/Pagination';
import { Thread } from './Thread';
import { NoThreads } from './NoThreads';

const ThreadsList = styled.ul`
  padding: 1rem;
`;

const StyledPagination = styled(Pagination)`
  margin-top: 2rem;
`;

export function AccountThreadsWidget() {
  const { user } = useUser();
  const { userThreads, isLoading } = useUserThreads();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(getUserThreads({ userId: user!.id, page }));
  }, [user!.id, page]);

  if (!userThreads || isLoading) {
    return <Widget.Loader />;
  }

  if (!user) return null;

  return (
    <>
      <Widget.Container>
        <Widget.Header>
          <Widget.Title>{user.username} threads</Widget.Title>
        </Widget.Header>
        {userThreads.threads.length < 1 ? (
          <NoThreads />
        ) : (
          <ThreadsList>
            {userThreads.threads.map((thread) => (
              <Thread key={thread.id} thread={thread} />
            ))}
          </ThreadsList>
        )}
      </Widget.Container>
      <StyledPagination
        baseUrl="/account/threads"
        currentPage={userThreads.page}
        totalPages={userThreads.totalPages}
      />
    </>
  );
}
