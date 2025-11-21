import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useUser } from '../../../entities/user';
import { UserAvatar } from '../../../entities/user/ui/UserAvatar';
import { Signout } from '../../../features/signout';

const Container = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1.8rem;
  line-height: 1;
  color: var(--color-text-secondary);
`;

const Account = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    color: var(--color-text-tertiary);
  }
`;

export function UserPanel() {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user) return null;

  return (
    <Container>
      <Account onClick={() => navigate('/account')}>
        <UserAvatar username={user.username} avatar={user.avatar} />
        {user.username}
      </Account>
      <Signout />
    </Container>
  );
}
