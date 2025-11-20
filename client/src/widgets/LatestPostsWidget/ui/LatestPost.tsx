import styled from 'styled-components';
import type { Post } from '../../../entities/post/model/types/Post';
import { UserAvatar } from '../../../entities/user/ui/UserAvatar';
import { Link } from 'react-router';
import { formatRelativeTime } from '../../../shared/lib/utils/formatRelativeTime';

interface LatestPostProps {
  post: Post;
}

const StyledPost = styled.li`
  line-height: 1;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const HeaderGroup = styled.div`
  overflow: hidden;
`;

const ThreadLink = styled(Link)`
  width: 100%;
  display: inline-block;
  margin-bottom: 0.2rem;
  border-bottom: 2px solid transparent;
  font-size: 1.6rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-primary);
  overflow: hidden;

  &:hover {
    border-bottom: 2px solid var(--color-primary);
  }
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

export function LatestPost({ post }: LatestPostProps) {
  return (
    <StyledPost>
      <Header>
        <UserAvatar
          username={post.author.username}
          avatar={post.author.avatar}
          size={4}
        />
        <HeaderGroup>
          <ThreadLink to={`/threads/${post.thread.id}`}>
            {post.thread.title}
          </ThreadLink>
          <Time>{formatRelativeTime(post.createdAt)}</Time>
        </HeaderGroup>
      </Header>
      <Main>{post.content}</Main>
    </StyledPost>
  );
}
