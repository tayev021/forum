import type { Author } from '../../model/types/Author';
import styled from 'styled-components';
import { UserAvatar } from '../../../../entities/user/ui/UserAvatar';
import { formatRelativeTime } from '../../../../shared/lib/utils/formatRelativeTime';

interface PostAuthorProps {
  author: Author;
}

const StyledPostAuthor = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr min-content min-content;
  justify-items: center;
  padding: 2rem;
  border-right: 2px solid var(--color-grey-200);
  font-size: 1.4rem;
`;

const StyledUserAvatar = styled(UserAvatar)`
  margin-bottom: 1rem;
`;

const UserName = styled.p`
  font-size: 1.8rem;

  & + p {
    margin-top: 4rem;
  }
`;

const SignInTime = styled.p`
  font-size: 1.4rem;
  line-height: 1.2;
  color: var(--color-grey-500);
`;

export function PostAuthor({ author }: PostAuthorProps) {
  return (
    <StyledPostAuthor>
      <StyledUserAvatar
        username={author.username}
        avatar={author.avatar}
        size={8}
      />
      <UserName>{author.username}</UserName>
      {author.lastSignIn && (
        <>
          <SignInTime>last sign in:</SignInTime>
          <SignInTime>{formatRelativeTime(author.lastSignIn)}</SignInTime>
        </>
      )}
    </StyledPostAuthor>
  );
}
