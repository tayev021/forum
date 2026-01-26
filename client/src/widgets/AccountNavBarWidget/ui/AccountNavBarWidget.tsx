import styled, { css } from 'styled-components';
import { NavLink } from 'react-router';
import {
  getUserNotifications,
  useRestrictTo,
  useUserNotifications,
} from '../../../entities/user';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import { Widget } from '../../../shared/ui/WidgetKit';
import {
  HiArrowRightOnRectangle,
  HiOutlineBellAlert,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCog6Tooth,
  HiOutlineHandThumbUp,
  HiOutlineSquare2Stack,
  HiOutlineUserCircle,
} from 'react-icons/hi2';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { Signout } from '../../../features/signout';

const Container = styled(Widget.Container)`
  height: max-content;
  position: sticky;
  top: 8rem;
  padding: 2rem 0;
  border: none;
  overflow: hidden;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  &:hover {
    background-color: var(--color-grey-200);
  }

  &:has(a.active) {
    color: var(--color-text-secondary);
    background-color: var(--color-primary);
  }
`;

const navBarButton = css`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  padding: 0.5rem 2rem;
  font-size: 1.6rem;
  font-weight: 500;

  svg {
    min-width: 2.4rem;
    min-height: 2.4rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  ${navBarButton}
`;

const StyledSignout = styled(Signout)`
  width: 100%;
  ${navBarButton}
`;

const NotificationsCounter = styled.span`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
  border-radius: 50%;
  font-size: 1.2rem;
  line-height: 1;
  color: var(--color-text-secondary);
  background-color: var(--color-rose-500);
`;

export function AccountNavBarWidget() {
  const { userNotifications } = useUserNotifications();
  const hasModeratePermissions = useRestrictTo(['admin', 'moderator']);
  const dispatch = useAppDispatch();
  const notificationsCount = userNotifications?.notifications.length || 0;

  useEffect(() => {
    if (!userNotifications) {
      dispatch(getUserNotifications({ page: 1 }));
    }
  }, [userNotifications]);

  return (
    <Container>
      <List>
        <Item>
          <StyledNavLink to="/account" end>
            <HiOutlineUserCircle />
            Bio
          </StyledNavLink>
        </Item>
        <Item>
          <StyledNavLink to="/account/posts">
            <HiOutlineChatBubbleBottomCenterText />
            Posts
          </StyledNavLink>
        </Item>
        <Item>
          <StyledNavLink to="/account/threads">
            <HiOutlineSquare2Stack />
            Threads
          </StyledNavLink>
        </Item>
        <Item>
          <StyledNavLink to="/account/subscriptions">
            <HiOutlineHandThumbUp />
            Subscriptions
          </StyledNavLink>
        </Item>
        <Item>
          <StyledNavLink to="/account/notifications">
            <HiOutlineBellAlert />
            Notifications
            {notificationsCount > 0 && (
              <NotificationsCounter>
                {notificationsCount > 9 ? '9+' : notificationsCount}
              </NotificationsCounter>
            )}
          </StyledNavLink>
        </Item>
        {hasModeratePermissions && (
          <Item>
            <StyledNavLink to="/account/reports">
              <AiOutlineExclamationCircle />
              Reports
            </StyledNavLink>
          </Item>
        )}
        <Item>
          <StyledNavLink to="/account/settings">
            <HiOutlineCog6Tooth />
            Settings
          </StyledNavLink>
        </Item>
        <Item>
          <StyledSignout>
            <HiArrowRightOnRectangle />
            Sign Out
          </StyledSignout>
        </Item>
      </List>
    </Container>
  );
}
