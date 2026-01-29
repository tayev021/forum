import type { Ref } from 'react';
import styled from 'styled-components';
import { UpdatePostForm } from '../../../../features/updatePost';
import { useUser } from '../../../../entities/user';
import { Author } from './Author';

interface PostUpdateProps {
  ref?: Ref<any>;
  postId?: number;
  postContent?: string;
}

const StyledPostUpdate = styled.li`
  display: grid;
  grid-template-columns: 18rem minmax(32rem, 1fr);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

export function PostUpdate({ ref, postId, postContent }: PostUpdateProps) {
  const { user } = useUser();

  if (!user) return null;

  return (
    <StyledPostUpdate ref={ref}>
      <Author author={{ ...user, lastSignIn: '' }} />
      <UpdatePostForm postId={postId} postContent={postContent} />
    </StyledPostUpdate>
  );
}
