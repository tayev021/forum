import type { UserPost } from '../../../entities/user';
import styled from 'styled-components';
import { Link } from 'react-router';
import { formatRelativeTime } from '../../../shared/lib/utils/formatRelativeTime';

interface PostProps {
  post: UserPost;
}

const StyledLink = styled(Link)`
  display: block;
  padding: 1rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const ThreadTitle = styled.h5`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--color-primary);
  overflow: hidden;
`;

const Time = styled.p`
  font-size: 1.4rem;
  white-space: nowrap;
  color: var(--color-grey-500);
`;

const Content = styled.p`
  word-wrap: break-word;
  overflow: hidden;
`;

export function Post({ post }: PostProps) {
  return (
    <li>
      <StyledLink
        to={`/threads/${post.thread.id}?page=${post.thread.page}#${post.id}`}
      >
        <PostHeader>
          <ThreadTitle>{post.thread.title}</ThreadTitle>
          <Time>{formatRelativeTime(post.createdAt)}</Time>
        </PostHeader>
        <Content>{post.content}</Content>
      </StyledLink>
    </li>
  );
}
