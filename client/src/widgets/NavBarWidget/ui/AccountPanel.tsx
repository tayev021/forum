import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useUser } from '../../../entities/user';
import { ShowNotifications } from '../../../features/showNotifications';
import { UserAvatar } from '../../../entities/user/ui/UserAvatar';
import { Signout } from '../../../features/signout';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';

const Container = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1.8rem;
  line-height: 1;
  color: var(--color-text-secondary);
`;

const Account = styled.button`
  display: grid;
  grid-template-columns: min-content minmax(7rem, max-content);
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    color: var(--color-text-tertiary);
  }
`;

const UserName = styled.h4`
  width: 100%;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledSignout = styled(Signout)`
  display: flex;
  align-items: center;

  &:hover {
    color: var(--color-text-tertiary);
  }
`;

export function AccountPanel() {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <Container>
      <ShowNotifications />
      <Account onClick={() => navigate('/account')}>
        <UserAvatar user={user} />
        <UserName>{user.username}</UserName>
      </Account>
      <StyledSignout>
        <HiArrowRightOnRectangle />
      </StyledSignout>
    </Container>
  );
}
