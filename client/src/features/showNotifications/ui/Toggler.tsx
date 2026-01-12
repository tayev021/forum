import type { MouseEvent } from 'react';
import styled from 'styled-components';
import { HiBellAlert } from 'react-icons/hi2';

interface TogglerProps {
  notificationsCount: number;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const Counter = styled.span`
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  border-radius: 50%;
  font-size: 1.2rem;
  line-height: 1;
  background-color: var(--color-rose-500);
`;

export function Toggler({
  notificationsCount,
  onClick = () => {},
}: TogglerProps) {
  return (
    <Button onClick={onClick}>
      <HiBellAlert />
      {notificationsCount > 1 && (
        <Counter>{notificationsCount > 9 ? '9+' : notificationsCount}</Counter>
      )}
    </Button>
  );
}
