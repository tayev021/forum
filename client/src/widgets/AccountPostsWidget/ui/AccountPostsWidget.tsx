import styled from 'styled-components';
import { getUserPosts, useUser, useUserPosts } from '../../../entities/user';
import { Widget } from '../../../shared/ui/WidgetKit';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { Pagination } from '../../../shared/ui/Pagination';
import { useSearchParams } from 'react-router';
import { Post } from './Post';
import { NoPosts } from './NoPosts';

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
  const { userPosts, isLoading } = useUserPosts();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(getUserPosts({ userId: user!.id, page }));
  }, [user!.id, page]);

  if (!userPosts || isLoading) {
    return <Widget.Loader />;
  }

  return (
    <Container>
      <StyledWidgetHeader>
        <Widget.Title>{user?.username} posts</Widget.Title>
      </StyledWidgetHeader>
      {userPosts.posts.length < 1 ? (
        <NoPosts />
      ) : (
        <>
          <PostsList>
            {userPosts?.posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </PostsList>
          <Pagination
            baseUrl="/account/posts"
            currentPage={userPosts.page}
            totalPages={userPosts.totalPages}
          />
        </>
      )}
    </Container>
  );
}
