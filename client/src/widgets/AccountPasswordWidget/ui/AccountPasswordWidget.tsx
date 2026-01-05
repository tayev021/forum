import styled from 'styled-components';
import { ChangePasswordForm } from '../../../features/changePassword';
import { Widget } from '../../../shared/ui/WidgetKit';
import { Modal } from '../../../shared/ui/Modal';

const Main = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ChangeButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: 2px solid var(--color-text-primary);
  border-radius: 0.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;

  @media (max-width: 900px) {
    grid-area: 2/1/3/2;
    justify-self: center;
  }

  &:hover {
    box-shadow: var(--shadow-small);
  }
`;

export function AccountPasswordWidget() {
  return (
    <Widget.Container>
      <Widget.Header>
        <Widget.Title>Change Password</Widget.Title>
      </Widget.Header>
      <Main>
        <>
          <Modal.Open windowName={'changePassword'}>
            <ChangeButton>Change Password</ChangeButton>
          </Modal.Open>
          <Modal.Window name={'changePassword'}>
            <ChangePasswordForm />
          </Modal.Window>
        </>
        <p>
          You can change your password at any time to keep your account secure.
          Make sure to choose a strong password that you don't use elsewhere.
        </p>
      </Main>
    </Widget.Container>
  );
}
