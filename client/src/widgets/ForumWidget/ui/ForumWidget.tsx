import { useCurrentForum } from '../lib/hooks/useCurrentForum';
import { useRestrictTo, useUser } from '../../../entities/user';
import { useNavigate } from 'react-router';
import { WidgetLoader } from '../../../shared/ui/widget-kit/WidgetLoader';
import { WidgetContainer } from '../../../shared/ui/widget-kit/WidgetContainer';
import { WidgetHeader } from '../../../shared/ui/widget-kit/WidgetHeader';
import { WidgetHeaderGroup } from '../../../shared/ui/widget-kit/WidgetHeaderGroup';
import { WidgetBackButton } from '../../../shared/ui/widget-kit/WidgetBackButton';
import { WidgetTitle } from '../../../shared/ui/widget-kit/WidgetTitle';
import { WidgetCreateButton } from '../../../shared/ui/widget-kit/WidgetCreateButton';
import { Modal } from '../../../shared/ui/modal';
import { WidgetDeleteButton } from '../../../shared/ui/widget-kit/WidgetDeleteButton';
import { WidgetConfirm } from '../../../shared/ui/widget-kit/WidgetConfirm';
import { DeleteForum } from '../../../features/deleteForum';
import { NoThreads } from './NoThreads';
import { ThreadsList } from './ThreadsList';
import { Pagination } from '../../../shared/ui/Pagination';

export function ForumWidget() {
  const { forum, isLoading } = useCurrentForum();
  const { user } = useUser();
  const hasAdminsPermissions = useRestrictTo(['admin']);
  const navigate = useNavigate();

  if (!forum || isLoading) {
    return <WidgetLoader />;
  }

  return (
    <>
      <WidgetContainer>
        <WidgetHeader>
          <WidgetHeaderGroup>
            <WidgetBackButton />
            <WidgetTitle>{forum?.title} Forum</WidgetTitle>
          </WidgetHeaderGroup>
          <WidgetHeaderGroup>
            {!!user && (
              <WidgetCreateButton
                onClick={() => navigate(`/forums/${forum.id}/createThread`)}
              />
            )}
            {hasAdminsPermissions && forum.threads.length === 0 && (
              <>
                <Modal.Open windowName={`deleteForum-${forum.id}`}>
                  <WidgetDeleteButton />
                </Modal.Open>
                <Modal.Window name={`deleteForum-${forum.id}`}>
                  <DeleteForum forumId={forum.id}>
                    <WidgetConfirm title="Delete Forum">
                      Are you sure you want to delete the "{forum.title}" forum?
                    </WidgetConfirm>
                  </DeleteForum>
                </Modal.Window>
              </>
            )}
          </WidgetHeaderGroup>
        </WidgetHeader>
        {!forum || forum.threads.length === 0 ? (
          <NoThreads />
        ) : (
          <ThreadsList threads={forum.threads} />
        )}
      </WidgetContainer>
      <Pagination
        baseUrl={`/forums/${forum.id}`}
        currentPage={forum.page}
        totalPages={forum.totalPages}
      />
    </>
  );
}
