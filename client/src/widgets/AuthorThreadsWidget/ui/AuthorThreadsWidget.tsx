import styled from 'styled-components';
import { Widget } from '../../../shared/ui/WidgetKit';
import { useUser } from '../../../entities/user';
import { getAuthorThreads, useAuthorThreads } from '../../../entities/thread';
import { useSearchParams } from 'react-router';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import { Pagination } from '../../../shared/ui/Pagination';
import { Thread } from './Thread';

const ThreadsList = styled.ul`
  padding: 1rem;
`;

const StyledPagination = styled(Pagination)`
  margin-top: 2rem;
`;

export function AuthorThreadsWidget() {
  const { user } = useUser();
  const { authorThreads, isLoading } = useAuthorThreads();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(getAuthorThreads({ authorId: user!.id, page }));
  }, [user!.id, page]);

  if (!authorThreads || isLoading) {
    return <Widget.Loader />;
  }

  return (
    <>
      <Widget.Container>
        <Widget.Header>
          <Widget.Title>{user?.username} threads</Widget.Title>
        </Widget.Header>
        {authorThreads && (
          <ThreadsList>
            {authorThreads?.threads.map((thread) => (
              <Thread key={thread.id} thread={thread} />
            ))}
          </ThreadsList>
        )}
      </Widget.Container>
      <StyledPagination
        baseUrl="/account/threads"
        currentPage={authorThreads.page}
        totalPages={authorThreads.totalPages}
      />
    </>
  );
}
