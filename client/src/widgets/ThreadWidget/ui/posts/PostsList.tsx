import type { ThreadPost } from '../../../../entities/thread';
import styled from 'styled-components';
import { PostItem } from './PostItem';

interface PostsListProps {
  posts: ThreadPost[];
}

const StyledPostsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export function PostsList({ posts }: PostsListProps) {
  return (
    <StyledPostsList>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </StyledPostsList>
  );
}
