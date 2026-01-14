import styled from 'styled-components';
import {
  getUserNotifications,
  useUser,
  useUserNotifications,
} from '../../../entities/user';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import { Dropdown } from '../../../shared/ui/Dropdown';
import { Toggler } from './Toggler';
import { Notifications } from './Notifications';
import { Link, useLocation } from 'react-router';
import { NoNotifications } from './NoNotifications';

const Container = styled.div`
  width: 25rem;
  padding: 1rem 0.5rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 0.4rem;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

const Button = styled(Link)`
  width: max-content;
  display: block;
  padding: 0.5rem;
  margin: 0.5rem auto 0;

  &:hover {
    color: var(--color-primary);
  }
`;

export function ShowNotifications() {
  const { user } = useUser();
  const { userNotifications, isLoading } = useUserNotifications();
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/account')) return;

    if (!userNotifications || userNotifications?.page !== 1) {
      dispatch(getUserNotifications({ page: 1 }));
    }
  }, [location.pathname, userNotifications]);

  if (
    !user ||
    location.pathname.includes('/account') ||
    !userNotifications ||
    isLoading
  )
    return null;

  return (
    <>
      <Dropdown.Open windowName="user-notifications">
        <Toggler notificationsCount={userNotifications.notifications.length} />
      </Dropdown.Open>
      <Dropdown.Window name="user-notifications">
        <Container>
          {userNotifications.notifications.length < 1 ? (
            <NoNotifications />
          ) : (
            <>
              <Notifications
                notifications={userNotifications.notifications.slice(0, 5)}
              />
              {userNotifications.notifications.length > 5 && (
                <Button to="/account/notifications">See All</Button>
              )}
            </>
          )}
        </Container>
      </Dropdown.Window>
    </>
  );
}
