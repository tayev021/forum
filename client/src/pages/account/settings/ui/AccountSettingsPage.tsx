import styled from 'styled-components';
import { useUser } from '../../../../entities/user';
import { AccountPasswordWidget } from '../../../../widgets/AccountPasswordWidget';
import { AccountDeleteWidget } from '../../../../widgets/AccountDeleteWidget';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export function AccountSettingsPage() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Container>
      <AccountPasswordWidget />
      {user.role === 'user' && <AccountDeleteWidget />}
    </Container>
  );
}
