import styled from 'styled-components';
import { WidgetLoader } from '../../../shared/ui/widget-kit/WidgetLoader';
import { useCurrentThread } from '../lib/hooks/useCurrentThread';
import { HiArrowLeft } from 'react-icons/hi2';
import { BackHomeButton } from '../../../shared/ui/BackHomeButton';
import { Pagination } from '../../../shared/ui/Pagination';
import { PostsList } from './posts/PostsList';

const ThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ThreadHeader = styled.header`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem 1rem 1rem;
  border: 1px solid var(--color-grey-300);
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
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

export function ThreadWidget() {
  const { thread, isLoading } = useCurrentThread();

  if (!thread || isLoading) {
    return <WidgetLoader />;
  }

  return (
    <>
      <ThreadContainer>
        <ThreadHeader>
          <BackHomeButton url={`/forums/${thread.forumId}`}>
            <BackIcon />
          </BackHomeButton>
          <Heading>{thread.title} Thread</Heading>
        </ThreadHeader>
        <PostsList posts={thread.posts} />
      </ThreadContainer>
      <Pagination
        baseUrl={`/threads/${thread.id}`}
        currentPage={thread.page}
        totalPages={thread.totalPages}
      />
    </>
  );
}
