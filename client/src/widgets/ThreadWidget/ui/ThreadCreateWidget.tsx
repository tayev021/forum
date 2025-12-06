import styled from 'styled-components';
import { WidgetHeader } from '../../../shared/ui/widget-kit/WidgetHeader';
import { WidgetHeaderGroup } from '../../../shared/ui/widget-kit/WidgetHeaderGroup';
import { useParams } from 'react-router';
import { useUser } from '../../../entities/user';
import { WidgetBackButton } from '../../../shared/ui/widget-kit/WidgetBackButton';
import { WidgetTitle } from '../../../shared/ui/widget-kit/WidgetTitle';
import { PostAuthor } from './posts/PostAuthor';
import { CreateThreadForm } from '../../../features/createThread';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledWidgetHeader = styled(WidgetHeader)`
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
  const { forumId } = useParams();
  const { user } = useUser();

  if (!user) return null;

  return (
    <Container>
      <StyledWidgetHeader>
        <WidgetHeaderGroup>
          <WidgetBackButton url={`/forums/${forumId}`} />
          <WidgetTitle>Create Thread</WidgetTitle>
        </WidgetHeaderGroup>
      </StyledWidgetHeader>
      <ThreadCreate>
        <PostAuthor author={{ ...user, lastSignIn: '' }} />
        <CreateThreadForm />
      </ThreadCreate>
    </Container>
  );
}
