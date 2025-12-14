import styled from 'styled-components';
import { WidgetHeader } from '../../../shared/ui/widget-kit/WidgetHeader';
import { useCurrentThread } from '../lib/hooks/useCurrentThread';
import { useRestrictTo } from '../../../entities/user';
import { WidgetLoader } from '../../../shared/ui/widget-kit/WidgetLoader';
import { WidgetHeaderGroup } from '../../../shared/ui/widget-kit/WidgetHeaderGroup';
import { WidgetBackButton } from '../../../shared/ui/widget-kit/WidgetBackButton';
import { WidgetTitle } from '../../../shared/ui/widget-kit/WidgetTitle';
import { InlineModal } from '../../../shared/ui/InlineModal';
import { UpdateThreadTitle } from '../../../features/updateThreadTitle';
import { WidgetTitleInput } from '../../../shared/ui/widget-kit/WidgetTitleInput';
import { WidgetEditButton } from '../../../shared/ui/widget-kit/WidgetEditButton';
import { Modal } from '../../../shared/ui/Modal';
import { WidgetDeleteButton } from '../../../shared/ui/widget-kit/WidgetDeleteButton';
import { DeleteThread } from '../../../features/deleteThread';
import { WidgetConfirm } from '../../../shared/ui/widget-kit/WidgetConfirm';
import { PostsList } from './posts/PostsList';
import { Pagination } from '../../../shared/ui/Pagination';
import { PostUpdate } from './posts/PostUpdate';

const ThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StyledWidgetHeader = styled(WidgetHeader)`
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

export function ThreadWidget() {
  const { thread, isLoading } = useCurrentThread();
  const hasAdminsPermissions = useRestrictTo(['admin']);
  const hasModeratePermissions = useRestrictTo(['admin', 'moderator']);

  if (!thread || isLoading) {
    return <WidgetLoader />;
  }

  return (
    <>
      <title>{`Forum | ${thread.title}`}</title>
      <ThreadContainer>
        <StyledWidgetHeader>
          <WidgetHeaderGroup>
            <WidgetBackButton url={`/forums/${thread.forumId}`} />
            <WidgetTitle>{thread.title} Thread</WidgetTitle>
            <InlineModal.Window name={`editThreadTitle-${thread.id}`}>
              <UpdateThreadTitle threadId={thread.id} page={thread.page}>
                <WidgetTitleInput currentTitle={thread.title} />
              </UpdateThreadTitle>
            </InlineModal.Window>
          </WidgetHeaderGroup>
          <WidgetHeaderGroup>
            {hasModeratePermissions && (
              <InlineModal.Open windowName={`editThreadTitle-${thread.id}`}>
                <WidgetEditButton />
              </InlineModal.Open>
            )}
            {hasAdminsPermissions && (
              <>
                <Modal.Open windowName={`deleteThread-${thread.id}`}>
                  <WidgetDeleteButton />
                </Modal.Open>
                <Modal.Window name={`deleteThread-${thread.id}`}>
                  <DeleteThread forumId={thread.forumId} threadId={thread.id}>
                    <WidgetConfirm title="Delete Thread">
                      Are you sure you want to delete the "{thread.title}"
                      thread?
                    </WidgetConfirm>
                  </DeleteThread>
                </Modal.Window>
              </>
            )}
          </WidgetHeaderGroup>
        </StyledWidgetHeader>
        <PostsList posts={thread.posts} />
      </ThreadContainer>
      <Pagination
        baseUrl={`/threads/${thread.id}`}
        currentPage={thread.page}
        totalPages={thread.totalPages}
      />
      <PostUpdate />
    </>
  );
}
