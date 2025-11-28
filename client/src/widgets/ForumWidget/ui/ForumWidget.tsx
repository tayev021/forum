import styled from 'styled-components';
import { WidgetContainer } from '../../../shared/ui/WidgetContainer';
import { WidgetLoader } from '../../../shared/ui/WidgetLoader';
import { useCurrentForum } from '../lib/hooks/useCurrentForum';
import { NoThreads } from './NoThreads';
import { ThreadsList } from './ThreadsList';
import { BackHomeButton } from '../../../shared/ui/BackHomeButton';
import { HiArrowLeft } from 'react-icons/hi2';
import { Pagination } from '../../../shared/ui/Pagination';

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
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

export function ForumWidget() {
  const { forum, isLoading } = useCurrentForum();

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
