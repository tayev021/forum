import type { ThreadPostAuthor } from '../../../../entities/thread';
import styled, { css } from 'styled-components';
import { UserAvatar } from '../../../../entities/user/ui/UserAvatar';
import { formatRelativeTime } from '../../../../shared/lib/utils/formatRelativeTime';
import { Link } from 'react-router';

interface AuthorProps {
  author: ThreadPostAuthor | null;
}

const StyledAuthor = styled.div`
  min-height: 25rem;
  display: grid;
  grid-template-rows: repeat(2, min-content) 1fr repeat(2, min-content);
  justify-items: center;
  padding: 2rem;
  border-right: 2px solid var(--color-grey-200);
  font-size: 1.4rem;

  @media (max-width: 600px) {
    min-height: auto;
    grid-template-columns:
      max-content minmax(5rem, max-content)
      max-content;
    grid-template-rows: min-content;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 2px solid var(--color-grey-200);
    border-right: none;
  }
`;

const StyledAuthorAvatar = styled(UserAvatar)`
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    width: 4rem;
    height: 4rem;
    margin-bottom: 0;
  }
`;

const authorNameCss = css`
  width: 100%;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 600px) {
    margin-bottom: 0;
  }
`;

const AuthorName = styled.p`
  ${authorNameCss}
`;

const AuthorLink = styled(Link)`
  ${authorNameCss}

  &:hover {
    color: var(--color-primary);
  }
`;

const AuthorRole = styled.p`
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-yellow-600);
`;

const SignInTime = styled.p`
  font-size: 1.4rem;
  line-height: 1.2;
  color: var(--color-grey-500);

  @media (max-width: 600px) {
    display: none;
  }

  & span {
    display: block;
    text-align: center;
  }
`;

export function Author({ author }: AuthorProps) {
  return (
    <StyledAuthor>
      <StyledAuthorAvatar user={author} size={8} />
      {author ? (
        <AuthorLink to={`/author/${author.id}/profile`}>
          {author.username}
        </AuthorLink>
      ) : (
        <AuthorName>deleted</AuthorName>
      )}
      <AuthorRole>
        {['admin', 'moderator'].includes(author?.role || '')
          ? author?.role
          : ''}
      </AuthorRole>
      {author?.lastSignIn && (
        <SignInTime>
          <span>last sign in: </span>
          <span>{formatRelativeTime(author.lastSignIn)}</span>
        </SignInTime>
      )}
    </StyledAuthor>
  );
}
