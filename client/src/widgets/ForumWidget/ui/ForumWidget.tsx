import styled from 'styled-components';
import { useCurrentForum } from '../lib/hooks/useCurrentForum';
import { Widget } from '../../../shared/ui/WidgetKit';
import { NoThreads } from './NoThreads';
import { ThreadsList } from './ThreadsList';
import { Pagination } from '../../../shared/ui/Pagination';
import { ForumWidgetHeader } from './ForumWidgetHeader';

const StyledPagination = styled(Pagination)`
  margin-top: 2rem;
`;

export function ForumWidget() {
  const { forum, isLoading } = useCurrentForum();

  if (!forum || isLoading) {
    return <Widget.Loader />;
  }

  return (
    <>
      <title>{`Forum | ${forum.title}`}</title>
      <Widget.Container>
        <ForumWidgetHeader forum={forum} />
        {!forum || forum.threads.length === 0 ? (
          <NoThreads />
        ) : (
          <ThreadsList threads={forum.threads} />
        )}
      </Widget.Container>
      <StyledPagination
        baseUrl={`/forums/${forum.id}`}
        currentPage={forum.page}
        totalPages={forum.totalPages}
      />
    </>
  );
}
