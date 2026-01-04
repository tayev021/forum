import styled from 'styled-components';
import { Widget } from '../../../shared/ui/WidgetKit';
import { Modal } from '../../../shared/ui/Modal';
import { DeleteAccount } from '../../../features/deleteAccount';

const Main = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  margin: 0 auto;
`;

const DeleteButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: 2px solid var(--color-rose-500);
  border-radius: 0.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--color-rose-500);
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-small);
  }
`;

export function AccountDeleteWidget() {
  return (
    <Widget.Container>
      <Widget.Header>
        <Widget.Title>Delete Account</Widget.Title>
      </Widget.Header>
      <Main>
        <>
          <Modal.Open windowName={`deleteAccount`}>
            <DeleteButton>Delete your account</DeleteButton>
          </Modal.Open>
          <Modal.Window name={`deleteAccount`}>
            <DeleteAccount>
              <Widget.Confirm title="Delete Account">
                Are you sure you want to delete your account?
              </Widget.Confirm>
            </DeleteAccount>
          </Modal.Window>
        </>
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
      </Main>
    </Widget.Container>
  );
}
