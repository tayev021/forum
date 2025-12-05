import styled from 'styled-components';
import { WidgetHeader } from '../../../shared/ui/widget-kit/WidgetHeader';
import { WidgetTitle } from '../../../shared/ui/widget-kit/WidgetTitle';
import { useLatestPosts } from '../../../entities/post';
import { WidgetContainer } from '../../../shared/ui/widget-kit/WidgetContainer';
import { WidgetLoader } from '../../../shared/ui/widget-kit/WidgetLoader';
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';
import { NoLatestPosts } from './NoLatestPosts';
import { LatestPost } from './LatestPost';

const StyledWidgetHeader = styled(WidgetHeader)`
  padding: 1rem;
`;

const StyledWidgetTitle = styled(WidgetTitle)`
  display: flex;
  gap: 1rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-secondary);
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

export function LatestPostsWidget() {
  const { latestPosts, isLoading } = useLatestPosts();

  return (
    <WidgetContainer>
      {isLoading && <WidgetLoader position="top" />}
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
    </WidgetContainer>
  );
}
