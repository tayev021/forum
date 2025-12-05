import styled from 'styled-components';
import { WidgetHeader } from '../../../shared/ui/widget-kit/WidgetHeader';
import { useCurrentThread } from '../lib/hooks/useCurrentThread';
import { WidgetLoader } from '../../../shared/ui/widget-kit/WidgetLoader';
import { WidgetHeaderGroup } from '../../../shared/ui/widget-kit/WidgetHeaderGroup';
import { WidgetBackButton } from '../../../shared/ui/widget-kit/WidgetBackButton';
import { WidgetTitle } from '../../../shared/ui/widget-kit/WidgetTitle';
import { PostsList } from './posts/PostsList';
import { Pagination } from '../../../shared/ui/Pagination';
import { PostCreate } from './posts/PostCreate';

const ThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledWidgetHeader = styled(WidgetHeader)`
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

export function ThreadWidget() {
  const { thread, isLoading } = useCurrentThread();

  if (!thread || isLoading) {
    return <WidgetLoader />;
  }

  return (
    <>
      <ThreadContainer>
        <StyledWidgetHeader>
          <WidgetHeaderGroup>
            <WidgetBackButton url={`/forums/${thread.forumId}`} />
            <WidgetTitle>{thread.title} Thread</WidgetTitle>
          </WidgetHeaderGroup>
        </StyledWidgetHeader>
        <PostsList posts={thread.posts} />
      </ThreadContainer>
      <Pagination
        baseUrl={`/threads/${thread.id}`}
        currentPage={thread.page}
        totalPages={thread.totalPages}
      />
      <PostCreate />
    </>
  );
}
