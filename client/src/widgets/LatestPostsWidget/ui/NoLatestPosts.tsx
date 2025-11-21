import styled from 'styled-components';

const NoPostsContainer = styled.div`
  font-style: italic;
  text-align: center;
  color: var(--color-grey-500);
`;

export function NoLatestPosts() {
  return <NoPostsContainer>No posts yet</NoPostsContainer>;
}
