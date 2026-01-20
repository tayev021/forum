import styled, { css } from 'styled-components';
import type { ThreadPost } from '../../../../entities/thread';
import { Widget } from '../../../../shared/ui/WidgetKit';
import { useRestrictTo, useUser } from '../../../../entities/user';
import { formatRelativeTime } from '../../../../shared/lib/utils/formatRelativeTime';
import { DeletePost } from '../../../../features/deletePost';
import { LikePost } from '../../../../features/likePost';
import { Modal } from '../../../../shared/ui/Modal';

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

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const styledButtonCss = css`
  width: 1.5rem;
  height: 1.5rem;
`;

const StyledEditButton = styled(Widget.EditButton)`
  ${styledButtonCss}
`;

const StyledDeleteButton = styled(Widget.DeleteButton)`
  ${styledButtonCss}
`;

const Main = styled.div`
  padding: 1rem;
  word-break: break-all;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem 1rem;
  border-top: 2px solid var(--color-grey-200);
`;

const UpdatedTime = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

export function PostContent({ post, handleUpdate }: PostContentProps) {
  const { user } = useUser();
  const hasModeratePermissions = useRestrictTo(['admin', 'moderator']);

  return (
    <StyledPostContent>
      <Header>
        <Time>{formatRelativeTime(post.createdAt)}</Time>
        <Actions>
          {user?.id === post?.author?.id && (
            <StyledEditButton onClick={handleUpdate} />
          )}
          {hasModeratePermissions && (
            <>
              <Modal.Open windowName={`deletePost-${post.id}`}>
                <StyledDeleteButton />
              </Modal.Open>
              <Modal.Window name={`deletePost-${post.id}`}>
                <DeletePost postId={post.id}>
                  <Widget.Confirm title="Delete Post">
                    Are you sure you want to delete the post?
                  </Widget.Confirm>
                </DeletePost>
              </Modal.Window>
            </>
          )}
        </Actions>
      </Header>
      <Main>{post.content}</Main>
      <Footer>
        <UpdatedTime>
          {post.createdAt !== post.updatedAt &&
            `updated ${formatRelativeTime(post.updatedAt)}`}
        </UpdatedTime>
        <LikePost post={post} />
      </Footer>
    </StyledPostContent>
  );
}
