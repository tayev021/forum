import { useSearchParams } from 'react-router';
import {
  getUserNotifications,
  useUser,
  useUserNotifications,
} from '../../../entities/user';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import { Widget } from '../../../shared/ui/WidgetKit';
import styled from 'styled-components';
import { Pagination } from '../../../shared/ui/Pagination';
import { NoSubscriptions } from '../../AccountSubscriptionsWidget/ui/NoSubscriptions';
import { Notification } from './Notification';

const NotificationsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const StyledPagination = styled(Pagination)`
  margin-top: 2rem;
`;

export function AccountNotificationsWidget() {
  const { user } = useUser();
  const { userNotifications, isLoading } = useUserNotifications();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(getUserNotifications({ page }));
  }, [page]);

  if (!userNotifications || isLoading) {
    return <Widget.Loader />;
  }

  if (!user) return null;

  return (
    <>
      <Widget.Container>
        <Widget.Header>
          <Widget.Title>{user.username} notifications</Widget.Title>
        </Widget.Header>
        {userNotifications.notifications.length < 1 ? (
          <NoSubscriptions />
        ) : (
          <NotificationsList>
            {userNotifications.notifications.map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))}
          </NotificationsList>
        )}
      </Widget.Container>
      <StyledPagination
        baseUrl="/account/notifications"
        currentPage={userNotifications.page}
        totalPages={userNotifications.totalPages}
      />
    </>
  );
}
