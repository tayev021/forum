import styled from 'styled-components';
import { useUser } from '../../../entities/user';
import { getAuthorPosts, useAuthorPosts } from '../../../entities/post';
import { Widget } from '../../../shared/ui/WidgetKit';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { Pagination } from '../../../shared/ui/Pagination';
import { useSearchParams } from 'react-router';
import { Post } from './Post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledWidgetHeader = styled(Widget.Header)`
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

const PostsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export function AccountPostsWidget() {
  const { user } = useUser();
  const { authorPosts, isLoading } = useAuthorPosts();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(getAuthorPosts({ authorId: user!.id, page }));
  }, [user!.id, page]);

  if (!authorPosts || isLoading) {
    return <Widget.Loader />;
  }

  return (
    <Container>
      <StyledWidgetHeader>
        <Widget.Title>{user?.username} posts</Widget.Title>
      </StyledWidgetHeader>
      {authorPosts && (
        <>
          <PostsList>
            {authorPosts?.posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </PostsList>
          <Pagination
            baseUrl="/account/posts"
            currentPage={authorPosts.page}
            totalPages={authorPosts.totalPages}
          />
        </>
      )}
    </Container>
  );
}
