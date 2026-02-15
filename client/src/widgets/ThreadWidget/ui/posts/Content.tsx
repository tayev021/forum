import styled, { css } from 'styled-components';
import type { ThreadPost } from '../../../../entities/thread';
import { Widget } from '../../../../shared/ui/WidgetKit';
import { useRestrictTo, useUser } from '../../../../entities/user';
import { formatRelativeTime } from '../../../../shared/lib/utils/formatRelativeTime';
import { DeletePost } from '../../../../features/deletePost';
import { LikePost } from '../../../../features/likePost';
import { Modal } from '../../../../shared/ui/Modal';
import { ReportPost } from '../../../../features/reportPost';
import { Attachments } from './Attachments';

interface ContentProps {
  post: ThreadPost;
  handleUpdate: () => void;
}

const StyledContent = styled.div`
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

const StyledReportButton = styled(Widget.ReportButton)`
  ${styledButtonCss}
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
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

export function Content({ post, handleUpdate }: ContentProps) {
  const { user } = useUser();
  const hasModeratePermissions = useRestrictTo(['admin', 'moderator']);
  const isReportable =
    user &&
    !post.isReported &&
    post.authorId !== user.id &&
    post.author?.role === 'user' &&
    !hasModeratePermissions;

  return (
    <StyledContent>
      <Header>
        <Time>{formatRelativeTime(post.createdAt)}</Time>
        <Actions>
          {user?.id === post?.author?.id && (
            <StyledEditButton onClick={handleUpdate} />
          )}
          {isReportable && (
            <>
              <Modal.Open windowName={`reportPost-${post.id}`}>
                <StyledReportButton />
              </Modal.Open>
              <Modal.Window name={`reportPost-${post.id}`}>
                <ReportPost post={post} />
              </Modal.Window>
            </>
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
      <Main>
        <p>{post.content}</p>
        <Attachments attachments={post.attachments} />
      </Main>
      <Footer>
        <UpdatedTime>
          {post.createdAt !== post.updatedAt &&
            `updated ${formatRelativeTime(post.updatedAt)}`}
        </UpdatedTime>
        <LikePost post={post} />
      </Footer>
    </StyledContent>
  );
}
