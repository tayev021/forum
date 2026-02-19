import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PostUpdate } from './PostUpdate';
import { Author } from './Author';
import { Content } from './Content';
import { useOutsideClick } from '../../../../shared/lib/hooks/useOutsideClick';
import type { ThreadPost } from '../../../../entities/thread';

interface PostProps {
  post: ThreadPost;
}

interface StyledPostProps {
  id: number;
}

const StyledPost = styled.li<StyledPostProps>`
  display: grid;
  grid-template-columns: 18rem minmax(32rem, 1fr);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export function Post({ post }: PostProps) {
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

        window.location.hash = '';
      }
    }
  }, []);

  if (isUpdating) {
    return <PostUpdate ref={ref} post={post} postContent={post.content} />;
  }

  return (
    <StyledPost id={post.id}>
      <Author author={post?.author} />
      <Content
        post={post}
        handleUpdate={() => setIsUpdating((current) => !current)}
      />
    </StyledPost>
  );
}
