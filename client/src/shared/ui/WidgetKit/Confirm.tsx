import styled from 'styled-components';

interface WidgetConfirmProps {
  title: string;
  children: string | string[];
  closeModal?: () => void;
  confirm?: () => void;
}

const Window = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 3rem;
  border: 1px solid var(--color-rose-500);
  border-radius: 0.4rem;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
`;

const Heading = styled.h4`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-rose-500);
`;

const Text = styled.p`
  text-align: center;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
`;

const Button = styled.button`
  padding: 0.8rem 2.4rem;
  border-radius: 0.4rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background-color: var(--color-primary);
  box-shadow: var(--shadow-small);
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-medium);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-small);
  }
`;

export function Confirm({
  title,
  children,
  closeModal = () => {},
  confirm = () => {},
}: WidgetConfirmProps) {
  return (
    <Window>
      <Heading>{title}</Heading>
      <Text>{children}</Text>
      <Actions>
        <Button onClick={confirm}>Confirm</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </Actions>
    </Window>
  );
}
