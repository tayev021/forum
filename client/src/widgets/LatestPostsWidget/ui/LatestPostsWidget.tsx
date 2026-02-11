import styled from 'styled-components';
import { Widget } from '../../../shared/ui/WidgetKit';
import { useLatestPosts } from '../../../entities/post';
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';
import { NoLatestPosts } from './NoLatestPosts';
import { LatestPost } from './LatestPost';

const StyledWidgetHeader = styled(Widget.Header)`
  padding: 1rem;
  grid-template-columns: 1fr;
`;

const StyledWidgetTitle = styled(Widget.Title)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1;
  color: var(--color-secondary);
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

export function LatestPostsWidget() {
  const { latestPosts, isLoading, error } = useLatestPosts();

  return (
    <Widget.Container>
      {isLoading && latestPosts.length <= 0 && <Widget.Loader position="top" />}
      {error?.type === 'general' && (
        <Widget.Error>{error.message}</Widget.Error>
      )}
      <StyledWidgetHeader>
        <StyledWidgetTitle>
          <HiOutlineChatBubbleBottomCenterText />
          Latest Posts
        </StyledWidgetTitle>
      </StyledWidgetHeader>
      <List>
        {latestPosts.length === 0 && <NoLatestPosts />}
        {latestPosts.map((post) => (
          <LatestPost key={post.id} post={post} />
        ))}
      </List>
    </Widget.Container>
  );
}
