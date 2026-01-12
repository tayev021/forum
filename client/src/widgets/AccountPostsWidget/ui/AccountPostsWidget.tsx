import styled from 'styled-components';
import { getUserPosts, useUser, useUserPosts } from '../../../entities/user';
import { Widget } from '../../../shared/ui/WidgetKit';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { Pagination } from '../../../shared/ui/Pagination';
import { useSearchParams } from 'react-router';
import { Post } from './Post';
import { NoPosts } from './NoPosts';

const PostsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const StyledPagination = styled(Pagination)`
  margin-top: 2rem;
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
    <>
      <Widget.Container>
        <Widget.Header>
          <Widget.Title>{user?.username} posts</Widget.Title>
        </Widget.Header>
        {userPosts.posts.length < 1 ? (
          <NoPosts />
        ) : (
          <>
            <PostsList>
              {userPosts?.posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </PostsList>
          </>
        )}
      </Widget.Container>
      <StyledPagination
        baseUrl="/account/posts"
        currentPage={userPosts.page}
        totalPages={userPosts.totalPages}
      />
    </>
  );
}
