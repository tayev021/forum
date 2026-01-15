import { useEffect } from 'react';
import {
  clearAuthorError,
  getAuthor,
  useAuthor,
} from '../../../entities/author';
import { Widget } from '../../../shared/ui/WidgetKit';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import { UserAvatar } from '../../../entities/user/ui/UserAvatar';
import styled from 'styled-components';

const Main = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 2rem;
  padding: 2rem;
`;

const AuthorInfo = styled.div`
  align-self: center;
`;

const Span = styled.span`
  font-weight: 500;
  color: var(--color-primary);
`;

const NoBio = styled.span`
  font-style: italic;
  color: var(--color-grey-500);
`;

export function AuthorProfileWidget() {
  const { author, isLoading, error } = useAuthor();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const authorId = Number(params.authorId);

  useEffect(() => {
    dispatch(getAuthor({ authorId }));
  }, [authorId]);

  useEffect(() => {
    if (error?.type === 'general') {
      toast.error(error.message);
      dispatch(clearAuthorError());
      navigate(-1);
    }
  }, [error]);

  if (isLoading) {
    return <Widget.Loader />;
  }

  return (
    <>
      <title>{`Forum | ${author?.username} Profile`}</title>
      <Widget.Container>
        <Widget.Header>
          <Widget.HeaderGroup>
            <Widget.BackButton />
            <Widget.Title>{author?.username} Profile</Widget.Title>
          </Widget.HeaderGroup>
        </Widget.Header>
        <Main>
          <UserAvatar user={author} size={16} />
          <AuthorInfo>
            <p>
              <Span>Username: </Span> {author?.username}
            </p>
            <p>
              <Span>Total Posts: </Span> {author?.totalPosts}
            </p>
            <p>
              <Span>Total Threads: </Span> {author?.totalThreads}
            </p>
            <p>
              <Span>Bio: </Span>{' '}
              {author?.bio ? author?.bio : <NoBio>No bio yet</NoBio>}
            </p>
          </AuthorInfo>
        </Main>
      </Widget.Container>
    </>
  );
}
