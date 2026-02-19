import styled from 'styled-components';
import { Widget } from '../../../shared/ui/WidgetKit';
import { useCurrentThread } from '../lib/hooks/useCurrentThread';
import { useRestrictTo } from '../../../entities/user';
import { InlineModal } from '../../../shared/ui/InlineModal';
import { UpdateThreadTitle } from '../../../features/updateThreadTitle';
import { Modal } from '../../../shared/ui/Modal';
import { DeleteThread } from '../../../features/deleteThread';
import { PostsList } from './posts/PostsList';
import { Pagination } from '../../../shared/ui/Pagination';
import { PostUpdate } from './posts/PostUpdate';
import { SubscribeThread } from '../../../features/subscribeThread';

const ThreadContainer = styled.div`
  min-height: 10rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StyledWidgetHeader = styled(Widget.Header)`
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

const StyledSubscribeThread = styled(SubscribeThread)`
  align-self: end;
`;

export function ThreadWidget() {
  const { thread, isLoading, error: serverError } = useCurrentThread();
  const hasAdminsPermissions = useRestrictTo(['admin']);
  const hasModeratePermissions = useRestrictTo(['admin', 'moderator']);

  return (
    <>
      <title>{`Forum | ${thread?.title || 'Error'}`}</title>
      <ThreadContainer>
        {isLoading && <Widget.Loader position="top" />}
        {serverError?.type === 'general' && (
          <Widget.Error>{serverError.message}</Widget.Error>
        )}
        {thread && (
          <>
            <StyledWidgetHeader>
              <Widget.HeaderGroup>
                <Widget.BackButton url={`/forums/${thread?.forumId}`} />
                <Widget.Title>{thread.title} Thread</Widget.Title>
                <InlineModal.Window name={`editThreadTitle-${thread.id}`}>
                  <UpdateThreadTitle threadId={thread.id}>
                    <Widget.TitleInput currentTitle={thread.title} />
                  </UpdateThreadTitle>
                </InlineModal.Window>
              </Widget.HeaderGroup>
              <Widget.HeaderGroup>
                {hasModeratePermissions && (
                  <InlineModal.Open windowName={`editThreadTitle-${thread.id}`}>
                    <Widget.EditButton />
                  </InlineModal.Open>
                )}
                {hasAdminsPermissions && (
                  <>
                    <Modal.Open windowName={`deleteThread-${thread.id}`}>
                      <Widget.DeleteButton />
                    </Modal.Open>
                    <Modal.Window name={`deleteThread-${thread.id}`}>
                      <DeleteThread
                        forumId={thread.forumId}
                        threadId={thread.id}
                      >
                        <Widget.Confirm title="Delete Thread">
                          Are you sure you want to delete the "{thread.title}"
                          thread?
                        </Widget.Confirm>
                      </DeleteThread>
                    </Modal.Window>
                  </>
                )}
              </Widget.HeaderGroup>
            </StyledWidgetHeader>
            <StyledSubscribeThread thread={thread} />
            <PostsList posts={thread.posts} />
            <Pagination
              baseUrl={`/threads/${thread.id}`}
              currentPage={thread.page}
              totalPages={thread.totalPages}
            />
          </>
        )}
      </ThreadContainer>
      <PostUpdate />
    </>
  );
}
