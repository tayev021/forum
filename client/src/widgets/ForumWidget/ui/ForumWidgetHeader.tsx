import type { Forum } from '../../../entities/forum';
import styled from 'styled-components';
import { useRestrictTo, useUser } from '../../../entities/user';
import { Widget } from '../../../shared/ui/WidgetKit';
import { useNavigate } from 'react-router';
import { InlineModal } from '../../../shared/ui/InlineModal';
import { UpdateForumTitle } from '../../../features/updateForumTitle';
import { SortThreads } from '../../../features/sortThreads';
import { Modal } from '../../../shared/ui/Modal';
import { DeleteForum } from '../../../features/deleteForum';

interface ForumWidgetHeaderProps {
  forum: Forum;
}

const StyledHeaderGroup = styled(Widget.HeaderGroup)`
  overflow: visible;
`;

export function ForumWidgetHeader({ forum }: ForumWidgetHeaderProps) {
  const { user } = useUser();
  const hasAdminsPermissions = useRestrictTo(['admin']);
  const hasModeratePermissions = useRestrictTo(['admin', 'moderator']);
  const navigate = useNavigate();

  return (
    <Widget.Header>
      <Widget.HeaderGroup>
        <Widget.BackButton />
        <Widget.Title>{forum?.title} Forum</Widget.Title>
        <InlineModal.Window name={`editForumTitle-${forum.id}`}>
          <UpdateForumTitle forumId={forum.id}>
            <Widget.TitleInput currentTitle={forum.title} />
          </UpdateForumTitle>
        </InlineModal.Window>
      </Widget.HeaderGroup>
      <StyledHeaderGroup>
        {forum.threads.length > 1 && <SortThreads />}
        {hasModeratePermissions && (
          <InlineModal.Open windowName={`editForumTitle-${forum.id}`}>
            <Widget.EditButton />
          </InlineModal.Open>
        )}
        {!!user && (
          <Widget.CreateButton
            onClick={() => navigate(`/threads/create?forumId=${forum.id}`)}
          />
        )}
        {hasAdminsPermissions && forum.threads.length === 0 && (
          <>
            <Modal.Open windowName={`deleteForum-${forum.id}`}>
              <Widget.DeleteButton />
            </Modal.Open>
            <Modal.Window name={`deleteForum-${forum.id}`}>
              <DeleteForum forumId={forum.id}>
                <Widget.Confirm title="Delete Forum">
                  Are you sure you want to delete the "{forum.title}" forum?
                </Widget.Confirm>
              </DeleteForum>
            </Modal.Window>
          </>
        )}
      </StyledHeaderGroup>
    </Widget.Header>
  );
}
