import { useCurrentForum } from '../lib/hooks/useCurrentForum';
import { WidgetLoader } from '../../../shared/ui/widget-kit/WidgetLoader';
import { WidgetContainer } from '../../../shared/ui/widget-kit/WidgetContainer';
import { NoThreads } from './NoThreads';
import { ThreadsList } from './ThreadsList';
import { Pagination } from '../../../shared/ui/Pagination';
import { ForumWidgetHeader } from './ForumWidgetHeader';

export function ForumWidget() {
  const { forum, isLoading } = useCurrentForum();

  if (!forum || isLoading) {
    return <WidgetLoader />;
  }

  return (
    <>
      <title>{`Forum | ${forum.title}`}</title>
      <WidgetContainer>
        <ForumWidgetHeader forum={forum} />
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
