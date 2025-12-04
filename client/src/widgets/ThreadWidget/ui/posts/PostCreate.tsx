import styled from 'styled-components';
import { CreatePostForm } from '../../../../features/createPost';
import { useUser } from '../../../../entities/user';
import { PostAuthor } from './PostAuthor';

const StyledPostCreate = styled.li`
  display: grid;
  grid-template-columns: 18rem minmax(32rem, 1fr);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

export function PostCreate() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <StyledPostCreate>
      <PostAuthor author={{ ...user, lastSignIn: '' }} />
      <CreatePostForm />
    </StyledPostCreate>
  );
}
