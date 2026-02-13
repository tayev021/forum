import type { SearchedPost } from '../../../entities/post/model/types/SearchedPost';
import styled from 'styled-components';
import { Link } from 'react-router';
import { UserAvatar } from '../../../entities/user/ui/UserAvatar';
import { formatRelativeTime } from '../../../shared/lib/utils/formatRelativeTime';

interface PostsProps {
  posts: SearchedPost[];
}

const StyledLink = styled(Link)`
  display: block;
  padding: 1rem 0.5rem;
  border-radius: 0.6rem;
  line-height: 1;
  cursor: pointer;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const HeaderGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  overflow: hidden;
`;

const Title = styled.h4`
  width: 100%;
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-primary);
  overflow: hidden;
`;

const Time = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

const Main = styled.div`
  font-size: 1.4rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export function Posts({ posts }: PostsProps) {
  return (
    <>
      {posts.map((post) => (
        <li key={post.id}>
          <StyledLink
            to={`/threads/${post.thread.id}?page=${post.thread.page}#${post.id}`}
          >
            <Header>
              <UserAvatar user={post.author} size={4} />
              <HeaderGroup>
                <Title>{post.thread.title}</Title>
                <Time>{formatRelativeTime(post.createdAt)}</Time>
              </HeaderGroup>
            </Header>
            <Main>{post.content}</Main>
          </StyledLink>
        </li>
      ))}
    </>
  );
}
