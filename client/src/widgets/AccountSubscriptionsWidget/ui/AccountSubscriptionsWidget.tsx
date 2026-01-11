import styled from 'styled-components';
import { Pagination } from '../../../shared/ui/Pagination';
import { useSearchParams } from 'react-router';
import {
  getUserSubscriptions,
  useUser,
  useUserSubscriptions,
} from '../../../entities/user';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import { Widget } from '../../../shared/ui/WidgetKit';
import { NoSubscriptions } from './NoSubscriptions';
import { Subscription } from './Subscription';

const SubscriptionsList = styled.ul`
  padding: 1rem;
`;

const StyledPagination = styled(Pagination)`
  margin-top: 2rem;
`;

export function AccountSubscriptionsWidget() {
  const { user } = useUser();
  const { userSubscriptions, isLoading } = useUserSubscriptions();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(getUserSubscriptions({ page }));
  }, [page]);

  if (!userSubscriptions || isLoading) {
    return <Widget.Loader />;
  }

  if (!user) return null;

  return (
    <>
      <Widget.Container>
        <Widget.Header>
          <Widget.Title>{user.username} subscriptions</Widget.Title>
        </Widget.Header>
        {userSubscriptions.subscriptions.length < 1 ? (
          <NoSubscriptions />
        ) : (
          <SubscriptionsList>
            {userSubscriptions.subscriptions.map((subscription) => (
              <Subscription key={subscription.id} subscription={subscription} />
            ))}
          </SubscriptionsList>
        )}
      </Widget.Container>
      <StyledPagination
        baseUrl="/account/subscriptions"
        currentPage={userSubscriptions.page}
        totalPages={userSubscriptions.totalPages}
      />
    </>
  );
}
