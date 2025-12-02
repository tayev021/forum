import styled from 'styled-components';
import type { Post } from '../../model/types/Post';
import { formatRelativeTime } from '../../../../shared/lib/utils/formatRelativeTime';

interface PostContentProps {
  post: Post;
}

const StyledPostContent = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr min-content;
`;

const PostHeader = styled.div`
  padding: 0.5rem 1rem;
  border-bottom: 2px solid var(--color-grey-200);
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const PostMain = styled.div`
  padding: 1rem;
`;

const PostFooter = styled.div`
  padding: 0.5rem 1rem;
  border-top: 2px solid var(--color-grey-200);
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

export function PostContent({ post }: PostContentProps) {
  return (
    <StyledPostContent>
      <PostHeader>{formatRelativeTime(post.createdAt)}</PostHeader>
      <PostMain>{post.content}</PostMain>
      {post.createdAt !== post.updatedAt && (
        <PostFooter>updated {formatRelativeTime(post.updatedAt)}</PostFooter>
      )}
    </StyledPostContent>
  );
}
