import styled from 'styled-components';
import { useLatestPosts } from '../../../entities/post/lib/hooks/useLatestPosts';
import { WidgetContainer } from '../../../shared/ui/WidgetContainer';
import { WidgetHeader } from '../../../shared/ui/WidgetHeader';
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';
import { LatestPost } from './LatestPost';
import { WidgetLoader } from '../../../shared/ui/WidgetLoader';

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
      {isLoading && <WidgetLoader />}
      <WidgetHeader>
        <HiOutlineChatBubbleBottomCenterText />
        <Heading>Latest Posts</Heading>
      </WidgetHeader>
      <List>
        {latestPosts.map((post) => (
          <LatestPost key={post.id} post={post} />
        ))}
      </List>
    </WidgetContainer>
  );
}
