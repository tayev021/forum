import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useUser } from '../../../entities/user/lib/hooks/useUser';
import { UserAvatar } from '../../../entities/user/ui/UserAvatar';

const Container = styled.button`
  display: flex;
  gap: 1rem;
  font-size: 1.8rem;
  line-height: 1;
  color: var(--color-text-secondary);
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
    <Container onClick={() => navigate('/account')}>
      <UserAvatar username={user.username} avatar={user.avatar} />
      {user.username}
    </Container>
  );
}
