import styled from 'styled-components';
import type { ThreadPost } from '../../../../entities/thread';
import { Widget } from '../../../../shared/ui/WidgetKit';
import { useUser } from '../../../../entities/user';
import { formatRelativeTime } from '../../../../shared/lib/utils/formatRelativeTime';

interface PostContentProps {
  post: ThreadPost;
  handleUpdate: () => void;
}

const StyledPostContent = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr min-content;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid var(--color-grey-200);
`;

const Time = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const StyledEditButton = styled(Widget.EditButton)`
  width: 1.5rem;
  height: 1.5rem;
`;

const Main = styled.div`
  padding: 1rem;
  word-break: break-all;
`;

const Footer = styled.div`
  padding: 0.5rem 1rem;
  border-top: 2px solid var(--color-grey-200);
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

export function PostContent({ post, handleUpdate }: PostContentProps) {
  const { user } = useUser();

  return (
    <StyledPostContent>
      <Header>
        <Time>{formatRelativeTime(post.createdAt)}</Time>
        <div>
          {user?.id === post?.author?.id && (
            <StyledEditButton onClick={handleUpdate} />
          )}
        </div>
      </Header>
      <Main>{post.content}</Main>
      {post.createdAt !== post.updatedAt && (
        <Footer>updated {formatRelativeTime(post.updatedAt)}</Footer>
      )}
    </StyledPostContent>
  );
}
