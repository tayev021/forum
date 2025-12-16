import styled from 'styled-components';
import type { Post } from '../../model/types/Post';
import { useEffect, useState } from 'react';
import { PostUpdate } from './PostUpdate';
import { PostAuthor } from './PostAuthor';
import { PostContent } from './PostContent';
import { useOutsideClick } from '../../../../shared/lib/hooks/useOutsideClick';

interface PostItemProps {
  post: Post;
}

interface StyledPostItemProps {
  id: number;
}

const StyledPostItem = styled.li<StyledPostItemProps>`
  display: grid;
  grid-template-columns: 18rem minmax(32rem, 1fr);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

export function PostItem({ post }: PostItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const ref = useOutsideClick(() => setIsUpdating(false));

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const element = document.getElementById(id);

      if (element) {
        window.scrollTo({
          top: element.offsetTop - 50,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  if (isUpdating) {
    return <PostUpdate ref={ref} postId={post.id} postContent={post.content} />;
  }

  return (
    <StyledPostItem id={post.id}>
      <PostAuthor author={post.author} />
      <PostContent
        post={post}
        handleUpdate={() => setIsUpdating((current) => !current)}
      />
    </StyledPostItem>
  );
}
