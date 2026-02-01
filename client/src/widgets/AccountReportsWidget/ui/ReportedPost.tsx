import { Link } from 'react-router';
import type { ReportedPost } from '../../../entities/report';
import { UserAvatar } from '../../../entities/user/ui/UserAvatar';
import styled from 'styled-components';
import { formatRelativeTime } from '../../../shared/lib/utils/formatRelativeTime';
import { Attachments } from './Attachments';

interface ReportedPostProps {
  post: ReportedPost;
}

const StyledPost = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 2rem;
  padding: 1rem;
  margin: 1rem 0;
  border: 2px solid transparent;
`;

const PostAuthor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  line-height: 1.2;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0 2rem;
  flex-wrap: wrap;
`;

const AuthorDeleted = styled.p`
  &:hover {
    color: var(--color-primary);
  }
`;

const StyledLink = styled(Link)`
  &:hover {
    color: var(--color-primary);
  }
`;

const ThreadTitle = styled(Link)`
  border-bottom: 1px solid transparent;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-primary);

  &:hover {
    border-color: var(--color-primary);
  }
`;

const Time = styled.p`
  font-size: 1.4rem;
  font-style: italic;
  color: var(--color-grey-500);
`;

const Content = styled.p`
  font-size: 1.4rem;
  word-break: break-all;
`;

export function ReportedPost({ post }: ReportedPostProps) {
  return (
    <StyledPost>
      <PostAuthor>
        <UserAvatar user={post.author || null} size={5} />
        {post?.author ? (
          <StyledLink to={`/author/${post.author.id}/profile`}>
            {post.author.username}
          </StyledLink>
        ) : (
          <AuthorDeleted>Deleted</AuthorDeleted>
        )}
      </PostAuthor>
      <PostContent>
        <Row>
          <ThreadTitle to={`/threads/${post.thread.id}?page=1`}>
            {post.thread.title}
          </ThreadTitle>
          <Time>{formatRelativeTime(post.createdAt)}</Time>
        </Row>
        <Content>{post.content}</Content>
        {post.attachments.length > 0 && (
          <Attachments attachments={post.attachments} />
        )}
      </PostContent>
    </StyledPost>
  );
}
