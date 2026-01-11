import styled from 'styled-components';
import {
  subscribeThread,
  unsubscribeThread,
  type Thread,
} from '../../../entities/thread';
import { useUser } from '../../../entities/user';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';

interface SubscribeThreadProps {
  className?: string;
  thread: Thread;
}

interface ButtonProps {
  $isSubscribed: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 0.4rem;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
  font-weight: 500;
  line-height: 1;
  cursor: pointer;

  &:hover {
    ${(props) =>
      props.$isSubscribed
        ? 'background-color: var(--color-rose-500);'
        : 'background-color: var(--color-primary);'}
  }
`;

export function SubscribeThread({
  className = '',
  thread,
}: SubscribeThreadProps) {
  const { user } = useUser();
  const dispatch = useAppDispatch();

  if (!user) return null;

  function handleClick() {
    if (thread.isSubscribed) {
      dispatch(unsubscribeThread({ threadId: thread.id }));
    } else {
      dispatch(subscribeThread({ threadId: thread.id }));
    }
  }

  return (
    <Button
      className={className}
      $isSubscribed={thread.isSubscribed}
      onClick={handleClick}
    >
      {thread.isSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </Button>
  );
}
