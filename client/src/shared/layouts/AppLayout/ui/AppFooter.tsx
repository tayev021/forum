import styled from 'styled-components';
import { Container } from '../../../ui/Container';
import { HiLink } from 'react-icons/hi2';

const Footer = styled.footer`
  background-color: var(--color-primary);
  box-shadow: var(--shadow-top-medium);
`;

const StyledContainer = styled(Container)`
  padding: 1.2rem 2.4rem;
  color: var(--color-text-secondary);
`;

const Copyright = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  line-height: 1;
`;

const LinkIcon = styled(HiLink)`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.2rem;
  transform: translateY(0.3rem);
`;

const TelegramLink = styled.a`
  margin-left: 0.8rem;

  &:hover {
    color: var(--color-text-tertiary);
  }

  span {
    border-bottom: 2px solid transparent;
  }

  &:hover span {
    border-color: var(--color-text-tertiary);
  }
`;

export function AppFooter() {
  return (
    <Footer>
      <StyledContainer>
        <Copyright>
          <p>&copy; 2025 Eugene Taranov</p>
          <TelegramLink href="https://t.me/tayev" target="_blank">
            <LinkIcon />
            <span>t.me/tayev</span>
          </TelegramLink>
        </Copyright>
      </StyledContainer>
    </Footer>
  );
}
