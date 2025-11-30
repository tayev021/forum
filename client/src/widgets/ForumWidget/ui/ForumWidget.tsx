import styled from 'styled-components';
import { WidgetContainer } from '../../../shared/ui/WidgetContainer';
import { WidgetLoader } from '../../../shared/ui/WidgetLoader';
import { useCurrentForum } from '../lib/hooks/useCurrentForum';
import { useRestrictTo } from '../../../entities/user';
import { NoThreads } from './NoThreads';
import { ThreadsList } from './ThreadsList';
import { BackHomeButton } from '../../../shared/ui/BackHomeButton';
import { HiArrowLeft } from 'react-icons/hi2';
import { Pagination } from '../../../shared/ui/Pagination';
import { Modal } from '../../../shared/ui/modal';
import {
  DeleteForumButton,
  DeleteForumForm,
} from '../../../features/deleteForum';

const Header = styled.header`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem 1rem 1rem;
  border-bottom: 1px solid var(--color-grey-400);
`;

const BackIcon = styled(HiArrowLeft)`
  width: 2rem;
  height: 2rem;
  color: var(--color-primary);
  cursor: pointer;

  &:hover {
    color: var(--color-rose-500);
  }
`;

const Heading = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
  color: var(--color-primary);
`;

const HeaderActions = styled.div`
  justify-self: flex-end;
`;

export function ForumWidget() {
  const { forum, isLoading } = useCurrentForum();
  const hasAdminsPermissions = useRestrictTo(['admin']);

  if (!forum || isLoading) {
    return <WidgetLoader />;
  }

  return (
    <>
      <WidgetContainer>
        <Header>
          <BackHomeButton>
            <BackIcon />
          </BackHomeButton>
          <Heading>{forum?.title} Forum</Heading>
          <HeaderActions>
            {hasAdminsPermissions && forum.threads.length === 0 && (
              <>
                <Modal.Open windowName={`deleteForum-${forum.id}`}>
                  <DeleteForumButton />
                </Modal.Open>
                <Modal.Window name={`deleteForum-${forum.id}`}>
                  <DeleteForumForm
                    forumId={forum.id}
                    forumTitle={forum.title}
                  />
                </Modal.Window>
              </>
            )}
          </HeaderActions>
        </Header>
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
