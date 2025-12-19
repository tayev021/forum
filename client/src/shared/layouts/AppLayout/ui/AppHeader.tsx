import styled from 'styled-components';
import { Container } from '../../../ui/Container';
import LogoImage from '../../../assets/logo.png';

const Header = styled.header`
  background-color: var(--color-primary);
  z-index: 200;
`;

const StyledContainer = styled(Container)`
  padding: 0.6rem 2.4rem 0;
  line-height: 1;
  color: var(--color-text-secondary);
`;

const Row = styled.div`
  display: flex;
  justify-content: center;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Logo = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  margin-right: 3rem;
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
        <Row>
          <Logo src={LogoImage} alt="Forum logo" />
          <Title>Forum</Title>
        </Row>
        <Row>
          <Slogan>Your space to share and discover</Slogan>
        </Row>
      </StyledContainer>
    </Header>
  );
}
