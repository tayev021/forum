import styled from 'styled-components';
import { Container } from '../../../ui/Container';
import LogoImage from '../../../assets/logo.png';

const Header = styled.header`
  background-color: var(--color-primary);
  z-index: 200;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem;
  line-height: 1;
  color: var(--color-white);
`;

const Column = styled.div`
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  margin-right: 2rem;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  letter-spacing: 5px;
  text-transform: uppercase;
`;

const Slogan = styled.p`
  font-size: 1.4rem;
  text-transform: uppercase;
`;

export function AppHeader() {
  return (
    <Header>
      <StyledContainer>
        <Column>
          <Logo src={LogoImage} alt="Forum logo" />
          <Title>Forum</Title>
        </Column>
        <Column>
          <Slogan>Your space to share and discover</Slogan>
        </Column>
      </StyledContainer>
    </Header>
  );
}
