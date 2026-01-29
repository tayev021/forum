import type { ThreadPost } from '../../../../entities/thread';
import styled from 'styled-components';
import { Post } from './Post';

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
        <Post key={post.id} post={post} />
      ))}
    </StyledPostsList>
  );
}
