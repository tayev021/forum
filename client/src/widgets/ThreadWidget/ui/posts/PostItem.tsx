import styled from 'styled-components';
import type { Post } from '../../model/types/Post';
import { PostAuthor } from './PostAuthor';
import { PostContent } from './PostContent';

interface PostItemProps {
  post: Post;
}

const StyledPostItem = styled.li`
  display: grid;
  grid-template-columns: 18rem minmax(32rem, 1fr);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

export function PostItem({ post }: PostItemProps) {
  return (
    <StyledPostItem>
      <PostAuthor author={post.author} />
      <PostContent post={post} />
    </StyledPostItem>
  );
}
