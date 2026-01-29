import styled from 'styled-components';
import { Widget } from '../../../shared/ui/WidgetKit';
import { useNavigate, useSearchParams } from 'react-router';
import { useUser } from '../../../entities/user';
import { useEffect } from 'react';
import { Author } from './posts/Author';
import { CreateThreadForm } from '../../../features/createThread';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledWidgetHeader = styled(Widget.Header)`
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

const ThreadCreate = styled.li`
  display: grid;
  grid-template-columns: 18rem minmax(32rem, 1fr);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

export function ThreadCreateWidget() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const forumId = Number(searchParams.get('forumId'));

  useEffect(() => {
    if (!forumId || isNaN(forumId)) {
      navigate('/');
    }
  }, [forumId]);

  if (!user) return null;

  return (
    <Container>
      <StyledWidgetHeader>
        <Widget.HeaderGroup>
          <Widget.BackButton url={`/forums/${forumId}`} />
          <Widget.Title>Create Thread</Widget.Title>
        </Widget.HeaderGroup>
      </StyledWidgetHeader>
      <ThreadCreate>
        <Author author={{ ...user, lastSignIn: '' }} />
        <CreateThreadForm />
      </ThreadCreate>
    </Container>
  );
}
