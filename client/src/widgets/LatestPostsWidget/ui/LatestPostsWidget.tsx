import styled from 'styled-components';
import { useLatestPosts } from '../../../entities/post/lib/hooks/useLatestPosts';
import { WidgetContainer } from '../../../shared/ui/widget-kit/WidgetContainer';
import { WidgetLoader } from '../../../shared/ui/widget-kit/WidgetLoader';
import { WidgetHeader } from '../../../shared/ui/widget-kit/WidgetHeader';
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';
import { NoLatestPosts } from './NoLatestPosts';
import { LatestPost } from './LatestPost';

const Heading = styled.h4`
  font-size: 1.6rem;
  font-weight: 500;
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
      <WidgetHeader>
        <HiOutlineChatBubbleBottomCenterText />
        <Heading>Latest Posts</Heading>
      </WidgetHeader>
      <List>
        {latestPosts.length === 0 && <NoLatestPosts />}
        {latestPosts.map((post) => (
          <LatestPost key={post.id} post={post} />
        ))}
      </List>
    </WidgetContainer>
  );
}
