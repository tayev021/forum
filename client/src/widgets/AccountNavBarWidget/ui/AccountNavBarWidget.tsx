import styled, { css } from 'styled-components';
import { NavLink } from 'react-router';
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

export function AccountNavBarWidget() {
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
          </StyledNavLink>
        </Item>
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
